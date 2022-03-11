package br.com.adaca.service;

import br.com.adaca.exception.ConflictException;
import br.com.adaca.exception.NotFoundException;
import br.com.adaca.model.Role;
import br.com.adaca.model.Tutor;
import br.com.adaca.repository.RoleRepository;
import br.com.adaca.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TutorService implements UserDetailsService {


    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Lista todos os tutores cadastrados no banco de dados
     *
     * @return Lista com todos os tutores cadastrados
     */
    public List<Tutor> listar() {
        List<Tutor> tutores = new ArrayList<>(tutorRepository.findAll());
        if (tutores.isEmpty()) throw new NotFoundException("Nenhum tutor encontrado!");
        return tutores;
    }

    /**
     * Efetua uma busca por ID do tutor cadastrado
     *
     * @param id ID do tutor já existente no banco de dados
     * @return Objeto do tutor encontrado
     */
    public Tutor selecionar(Integer id) {
        Optional<Tutor> tutor = tutorRepository.findById(id);
        if (!tutor.isPresent()) throw new NotFoundException("Tutor não encontrado! Id: " + id);
        return tutor.get();
    }

    /**
     * Salva o tutor da criança no banco de dados
     *
     * @param tutor Objeto preenchido do tutor a ser gravado
     * @return Objeto salvo
     */
    public Tutor salvar(Tutor tutor) {
        if (tutor.getId() != null) {
            Optional<Tutor> op = tutorRepository.findById(tutor.getId());
            if (op.isPresent()) throw new ConflictException("O tutor já existe!");
        }
        tutor.setSenha(passwordEncoder.encode(tutor.getSenha()));
        Role userRole = roleRepository.findByRole("TUTOR");
        tutor.setRoles(new HashSet<>(Collections.singletonList(userRole)));
        return tutorRepository.save(tutor);
    }

    /**
     * Altera o cadastro do tutor no bando de dados
     *
     * @param tutor Objeto preenchido com os dados já alterados
     * @return Objeto alterado
     */
    public Tutor alterar(Tutor tutor) {
        Tutor sess = null;
        if (tutor.getId() != null) {
            tutor.setSenha(passwordEncoder.encode(tutor.getSenha()));
            sess = tutorRepository.save(tutor);
        }
        return sess;
    }

    /**
     * Efetua uma busca por ID do tutor cadastrado e remove-o do banco de dados
     *
     * @param id ID do tutor já existente no banco de dados
     */
    public void remover(Integer id) {
        Optional<Tutor> tutor = tutorRepository.findById(id);
        if (!tutor.isPresent()) {
            throw new NotFoundException("Id: " + id);
        } else {
            tutorRepository.delete(tutor.get());
        }
    }

    /**
     * Remove o cadastro do tutor do banco de dados
     *
     * @param tutor Objeto preenchido do cadastro já existente no banco de dados
     */
    public void remover(Tutor tutor) {
        tutorRepository.delete(tutor);
    }

    public Tutor findByUsuario(String usuario) {
        return (tutorRepository.findByUsuario(usuario));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Tutor tutor = findByUsuario(username);
        if (tutor == null) {
            throw new UsernameNotFoundException("Usuario ou senha invalidos.");
        }
        return new org.springframework.security.core.userdetails.User(tutor.getUsuario(), tutor.getSenha(),
                mapRolesToAuthorities(tutor.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole()))
                .collect(Collectors.toList());
    }
}

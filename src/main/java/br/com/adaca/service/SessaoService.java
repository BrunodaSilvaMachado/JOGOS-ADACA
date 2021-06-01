package br.com.adaca.service;

import br.com.adaca.exception.ConflictException;
import br.com.adaca.exception.NotFoundException;
import br.com.adaca.model.Sessao;
import br.com.adaca.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SessaoService {

    @Autowired
    private SessaoRepository sessaoRepository;

    /**
     * Lista todos os sessões cadastradas no banco de dados
     *
     * @return Lista com todos os sessões cadastrados
     */
    public List<Sessao> listar() {
        List<Sessao> sessoes = new ArrayList<>();
        for (Sessao sessao : sessaoRepository.findAll()) {
            sessoes.add(sessao);
        }
        if (sessoes.isEmpty()) throw new NotFoundException("Nenhuma sessão encontrada!");
        return sessoes;
    }

    /**
     * Lista todos os sessões cadastradas no banco de dados filtradas pela criança
     *
     * @param autistaId ID da criança para o filtro
     * @return Lista com todos os sessões cadastrados
     */
    public List<Sessao> listar(Integer autistaId) {
        List<Sessao> sessoes = sessaoRepository.listByAutista(autistaId);
        if (sessoes.isEmpty()) throw new NotFoundException("Nenhuma sessão encontrada!");
        return sessoes;
    }

    /**
     * Efetua uma busca por ID da sessao cadastrado
     *
     * @param id ID do sessao já existente no banco de dados
     * @return Objeto da sessão encontrado
     */
    public Sessao selecionar(Integer id) {
        Optional<Sessao> sessao = sessaoRepository.findById(id);
        if (!sessao.isPresent()) throw new NotFoundException("Sessão não encontrada! Id: " + id);
        return sessao.get();
    }

    /**
     * Salva a sessão da criança no banco de dados
     *
     * @param sessao Objeto preenchido da sessão a ser gravado
     * @return Objeto salvo
     */
    public Sessao salvar(Sessao sessao) {
        if (sessao.getId() != null) {
            Optional<Sessao> op = sessaoRepository.findById(sessao.getId());
            if (op.isPresent()) throw new ConflictException("A sessão já existe!");
        }
        return sessaoRepository.save(sessao);
    }

    /**
     * Altera o cadastro da sessão no bando de dados
     *
     * @param sessao Objeto preenchido com os dados já alterados
     * @return Objeto alterado
     */
    public Sessao alterar(Sessao sessao) {
        Sessao sess = null;
        if (sessao.getId() != null) {
            sess = sessaoRepository.save(sessao);
        }
        return sess;
    }

    /**
     * Efetua uma busca por ID da sessão cadastrada e remove-a do banco de dados
     *
     * @param id ID do sessao já existente no banco de dados
     */
    public void remover(Integer id) {
        Optional<Sessao> sessao = sessaoRepository.findById(id);
        if (!sessao.isPresent()) {
            throw new NotFoundException("Id: " + id);
        } else {
            sessaoRepository.delete(sessao.get());
        }
    }

    /**
     * Remove a sessão do banco de dados
     *
     * @param sessao Objeto preenchido da sessao já existente no banco de dados
     */
    public void remover(Sessao sessao) {
        sessaoRepository.delete(sessao);
    }

    public Sessao getLastCurrentSessao(){
        return sessaoRepository.getLastCurrentSessao();
    }
}

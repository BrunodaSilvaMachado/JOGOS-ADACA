package br.com.adaca.service;

import br.com.adaca.exception.ConflictException;
import br.com.adaca.exception.NotFoundException;
import br.com.adaca.model.Resultado;
import br.com.adaca.repository.ResultadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ResultadoService {

    @Autowired
    private ResultadoRepository resultadoRepository;

    /**
     * Lista todos os resultadoes cadastrados no banco de dados
     *
     * @return Lista com todos os resultados cadastrados
     */
    public List<Resultado> listar() {
        List<Resultado> resultados = new ArrayList<>();
        for (Resultado r : resultadoRepository.findAll()) {
            resultados.add(r);
        }
        if (resultados.isEmpty()) throw new NotFoundException("Nenhum resultado encontrado!");
        return resultados;
    }

    /**
     * Lista todos os resultados cadastrados no banco de dados filtrados pela sessão
     *
     * @param sessaoId ID da sessão para filtro da pesquisa
     * @return Lista com todos os responsáveis cadastrados
     */
    public List<Resultado> listar(Integer sessaoId) {
        List<Resultado> resultados = resultadoRepository.listBySessao(sessaoId);
        if (resultados.isEmpty()) throw new NotFoundException("Nenhum resultado encontrado!");
        return resultados;
    }

    /**
     * Efetua uma busca por ID do resultado cadastrado
     *
     * @param id ID do resultado já existente no banco de dados
     * @return Objeto do resultado encontrado
     */
    public Resultado selecionar(Integer id) {
        Optional<Resultado> resultado = resultadoRepository.findById(id);
        if (!resultado.isPresent()) throw new NotFoundException("Resultado não encontrado! Id: " + id);
        return resultado.get();
    }

    /**
     * Salva o resultado da criança no banco de dados
     *
     * @param resultado Objeto preenchido do resultado a ser gravado
     * @return Objeto salvo
     */
    public Resultado salvar(Resultado resultado) {
        if (resultado.getId() != null) {
            Optional<Resultado> op = resultadoRepository.findById(resultado.getId());
            if (op.isPresent()) throw new ConflictException("O resultado já existe!");
        }
        return resultadoRepository.save(resultado);
    }

    /**
     * Altera o cadastro do resultado no bando de dados
     *
     * @param resultado Objeto preenchido com os dados já alterados
     * @return Objeto alterado
     */
    public Resultado alterar(Resultado resultado) {
        Resultado res = null;
        if (resultado.getId() != null) {
            res = resultadoRepository.save(resultado);
        }
        return res;
    }

    /**
     * Efetua uma busca por ID do resultado cadastrado e remove-o do banco de dados
     *
     * @param id ID do resultado já existente no banco de dados
     */
    public void remover(Integer id) {
        Optional<Resultado> resultado = resultadoRepository.findById(id);
        if (!resultado.isPresent()) {
            throw new NotFoundException("Id: " + id);
        } else {
            resultadoRepository.delete(resultado.get());
        }
    }

    /**
     * Remove o cadastro do resultado do banco de dados
     *
     * @param resultado Objeto preenchido do cadastro já existente no banco de dados
     */
    public void remover(Resultado resultado) {
        resultadoRepository.delete(resultado);
    }
}

package br.com.adaca.repository;

import br.com.adaca.model.Resultado;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;
import java.util.List;

public interface ResultadoRepository extends CrudRepository<Resultado, Serializable> {

    @Query("SELECT r FROM Resultado r WHERE r.idsessao = :sessaoId")
    List<Resultado> listBySessao(@Param("sessaoId") Integer sessaoId);
}

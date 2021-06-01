package br.com.adaca.repository;

import br.com.adaca.model.Configuracao;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;
import java.util.List;

public interface ConfiguracaoRepository extends CrudRepository<Configuracao, Serializable> {

    @Query("SELECT c FROM Configuracao c WHERE c.idautista = :autistaId AND c.idtutor = :tutorId")
    List<Configuracao> listIdAutistaTutor(@Param("autistaId") Integer autistaId, @Param("tutorId") Integer tutorId);
}

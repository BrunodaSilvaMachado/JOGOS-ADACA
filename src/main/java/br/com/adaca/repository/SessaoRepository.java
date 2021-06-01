package br.com.adaca.repository;

import br.com.adaca.model.Sessao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;
import java.util.List;


public interface SessaoRepository extends JpaRepository<Sessao, Integer> {

    @Query("SELECT s FROM Sessao s WHERE s.idautista = :autistaId")
    List<Sessao> listByAutista(@Param("autistaId") Integer autistaId);

    @Query("SELECT s FROM Sessao s WHERE s.id in (SELECT MAX(id) FROM Sessao)")
    Sessao getLastCurrentSessao();
}

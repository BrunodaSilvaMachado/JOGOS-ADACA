package br.com.adaca.repository;

import br.com.adaca.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;

public interface TutorRepository extends JpaRepository<Tutor, Integer> {

//    @Query("SELECT t FROM Tutor t WHERE upper(t.usuario) = :usuario AND t.senha = :senha")
//    Tutor login(@Param("usuario") String usuario, @Param("senha") String senha);

    Tutor findByUsuario(@Param("usuario") String usuario);
}

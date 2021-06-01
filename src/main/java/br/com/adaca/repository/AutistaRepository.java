package br.com.adaca.repository;

import br.com.adaca.model.Autista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AutistaRepository extends JpaRepository<Autista, Integer> {

    /* @Query("SELECT a.id, a.nome FROM Autista a")
     public List<Autista> listNamesId();*/
    @Query(value = "SELECT * FROM tb_autista WHERE medicamentos = 1", nativeQuery = true)
    List<Autista> listAutistaMedicamentos();
}

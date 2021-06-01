package br.com.adaca.model;

import br.com.adaca.util.BaseId;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author Willian
 */
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_responsavel")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Responsavel implements Serializable, BaseId {

    private static final long serialVersionUID = -8213342763966035009L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;
    @Column(nullable = false, length = 14)
    private String cpf;
    @Column(nullable = false, length = 70)
    private String nome;
    @Column(nullable = false, length = 15)
    private String sexo;
    @Column(length = 45)
    private String email;
    @Column(nullable = false, length = 13)
    private String telefone;
    @Column(length = 14)
    private String celular;
    @Column(nullable = false, length = 60)
    private String endereco;
    @Column(nullable = false, length = 30)
    private String cidade;
    @Column(nullable = false, length = 30)
    private String estado;
    @JoinColumn(name = "IDAUTISTA", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Autista idautista;

    public Integer getId() {
        return id;
    }
}

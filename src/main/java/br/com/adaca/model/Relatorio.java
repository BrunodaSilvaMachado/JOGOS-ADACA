package br.com.adaca.model;

import br.com.adaca.util.BaseId;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

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
@Table(name = "tb_relatorio")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Relatorio implements Serializable, BaseId {

    private static final long serialVersionUID = 9122449637418259108L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;
    @Lob
    @Column(nullable = false)
    private byte[] relatorio;
    @Column(nullable = false, length = 30)
    private String tiporelatorio;
    @Temporal(TemporalType.TIMESTAMP)
    private Date datagerado;
    @JoinColumn(name = "IDAUTISTA", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Autista idautista;
    @JoinColumn(name = "IDADMINISTRADOR", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Administrador idadministrador;

    public Integer getId() {
        return id;
    }
}

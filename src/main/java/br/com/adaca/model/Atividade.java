package br.com.adaca.model;

import br.com.adaca.util.BaseId;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * @author Willian
 */
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_atividade")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Atividade implements Serializable, BaseId {

    private static final long serialVersionUID = -4836465931631553059L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;
    @Column(nullable = false, length = 80)
    private String nome;
    @Column(length = 80)
    private String classificacao;
    private Integer nivel;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idatividade")
    private List<Labirinto> labirintoList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idatividade")
    private List<Resultado> resultadoList;

    @Override
    public String toString() {
        return String.valueOf(getId());
    }
}

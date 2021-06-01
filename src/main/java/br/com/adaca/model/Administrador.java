package br.com.adaca.model;

import br.com.adaca.util.BaseId;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

/**
 * @author Willian
 */
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@Entity
@Table(name = "tb_administrador")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id"
)
public class Administrador implements Serializable, BaseId {

    private static final long serialVersionUID = 3176372843594139191L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;
    @Column(nullable = false, length = 70)
    private String nome;
    @Column(nullable = false, length = 50)
    private String usuario;
    @Column(nullable = false, length = 100)
    private String senha;
    @Column(nullable = false)
    private Integer nivelacesso;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idadministrador")
    private List<Grafico> graficoList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idadministrador")
    private List<Relatorio> relatorioList;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;

    @Override
    public String toString() {
        return "Administrador{" +
                "id=" + getId() +
                ", nome='" + getNome() + "'" +
                ", usuario='" + getUsuario() + "'" +
                ", senha='" + "********" + "'" +
                ", nivelacesso=" + getNivelacesso() +
                ", graficoList=" + "null" +
                ", relatorioList=" + "null" +
                ", roles=" + getRoles() + "}";
    }
}

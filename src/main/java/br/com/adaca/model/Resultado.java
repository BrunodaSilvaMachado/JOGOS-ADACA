package br.com.adaca.model;

import br.com.adaca.util.BaseId;
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
@Table(name = "tb_resultado")
public class Resultado implements Serializable, BaseId {

    private static final long serialVersionUID = -4156796095161566727L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer id;
    @Column(nullable = false)
    private Integer dicas;
    @Column(nullable = false)
    private Integer cliquecerto;
    @Column(nullable = false)
    private Integer cliqueerrado;
    @Lob
    @Column(nullable = false, length = 65535)
    private String mouseclique;
    @Lob
    @Column(nullable = false, length = 65535)
    private String mousedrag;
    @Lob
    @Column(nullable = false, length = 16777215)
    private String mousepos;
    @Lob
    @Column(nullable = false, length = 65535)
    private String poserrado;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date horainicio;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date horafim;
    @JoinColumn(name = "IDSESSAO", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Sessao idsessao;
    @JoinColumn(name = "IDATIVIDADE", referencedColumnName = "ID", nullable = false)
    @ManyToOne(optional = false)
    private Atividade idatividade;

    public Integer getId() {
        return id;
    }
}

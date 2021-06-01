package br.com.adaca.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;
    @Column(name = "nome")
    private String role;

    @Override
    public String toString() {
        return "Role{" +
                "id=" + getId() +
                ",role='" + getRole() + "'" +
                "}";
    }
}

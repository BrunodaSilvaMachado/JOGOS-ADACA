package br.com.adaca.controller;

import br.com.adaca.model.Autista;
import br.com.adaca.service.AutistaService;
import br.com.adaca.view.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/Jogos/Autistas")
public class AutistaController extends View<Autista> {
    @Autowired
    private AutistaService autistaService;

    public AutistaController() {
        super("autistas", "autistaAdd");
    }

    @GetMapping()
    public ResponseEntity<List<Autista>> listar() {
        return ResponseEntity.status(HttpStatus.OK).body(autistaService.listar());
    }

    @GetMapping("/{autistaId}")
    public ResponseEntity<Autista> selecionar(@PathVariable("autistaId") Integer autistaId) {
        return ResponseEntity.status(HttpStatus.OK).body(autistaService.selecionar(autistaId));
    }

    @PostMapping()
    public ResponseEntity<Void> salvar(@RequestBody @Valid Autista autista) {
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(autistaService.salvar(autista).getId()).toUri()).build();
    }

    @PutMapping()
    public ResponseEntity<Autista> alterar(@RequestBody @Valid Autista autista) {
        return ResponseEntity.status(HttpStatus.OK).body(autistaService.alterar(autista));
    }

    @DeleteMapping("/{autistaId}")
    public ResponseEntity<Void> remover(@PathVariable("autistaId") Integer autistaId) {
        autistaService.remover(autistaId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @DeleteMapping()
    public ResponseEntity<Void> remover(@RequestBody @Valid Autista autista) {
        autistaService.remover(autista);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    /*
        @GetMapping("/listarNomesIdAutistas")
        public  ResponseEntity<List<AutistaDTO>> listarNomesId() {
            return ResponseEntity.status(HttpStatus.OK).body(autistaService.listarNomesId());
        }
    */
}
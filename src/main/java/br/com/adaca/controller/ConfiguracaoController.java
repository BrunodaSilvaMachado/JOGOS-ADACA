package br.com.adaca.controller;

import br.com.adaca.model.Autista;
import br.com.adaca.model.Configuracao;
import br.com.adaca.model.Sessao;
import br.com.adaca.service.AutistaService;
import br.com.adaca.service.ConfiguracaoService;
import br.com.adaca.service.SessaoService;
import br.com.adaca.service.TutorService;
import br.com.adaca.view.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Jogos/Configuracoes")
public class ConfiguracaoController extends View<Configuracao> {

    @Autowired
    private ConfiguracaoService configuracaoService;
    @Autowired
    private AutistaService autistaService;
    @Autowired
    private TutorService tutorService;
    @Autowired
    private SessaoService sessaoService;

    public ConfiguracaoController() {
        super("configuracoes", "configuracaoAdd");
    }

    @GetMapping()
    public ResponseEntity<List<Configuracao>> listar() {
        return ResponseEntity.status(HttpStatus.OK).body(configuracaoService.listar());
    }

    @GetMapping("/{autistaId}/{tutorId}")
    public ResponseEntity<List<Configuracao>> listar(@PathVariable("autistaId") Integer autistaId, @PathVariable("tutorId") Integer tutorId) {
        return ResponseEntity.status(HttpStatus.OK).body(configuracaoService.listarConfigAutistaTutor(autistaId, tutorId));
    }

    @GetMapping("/{configuracaoId}")
    public ResponseEntity<Configuracao> selecionar(@PathVariable("configuracaoId") Integer configuracaoId) {
        return ResponseEntity.status(HttpStatus.OK).body(configuracaoService.selecionar(configuracaoId));
    }

    @PostMapping()
    public ResponseEntity<Void> salvar(@RequestBody @Valid Configuracao configuracao) {
        return ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(configuracaoService.salvar(configuracao).getId()).toUri()).build();
    }

    @PutMapping()
    public ResponseEntity<Configuracao> alterar(@RequestBody @Valid Configuracao configuracao) {
        return ResponseEntity.status(HttpStatus.OK).body(configuracaoService.alterar(configuracao));
    }

    @DeleteMapping("/{configuracaoId}")
    public ResponseEntity<Void> remover(@PathVariable("configuracaoId") Integer configuracaoId) {
        configuracaoService.remover(configuracaoId);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @DeleteMapping()
    public ResponseEntity<Void> remover(@RequestBody @Valid Configuracao configuracao) {
        configuracaoService.remover(configuracao);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    protected ModelAndView mvSave(Configuracao configuracao, BindingResult bindingResult){
        Sessao sessao = sessaoService.getLastCurrentSessao();
        configuracao.setIdautista(sessao.getIdautista());
        configuracao.setIdtutor(sessao.getIdtutor());
        configuracao.setIdsessao(sessao);

        return super.mvSave(configuracao,bindingResult);
    }

    protected ModelAndView mvAdd(Configuracao o) {
        ModelAndView mv = new ModelAndView(getAddViewName());

        try {
            o.setIdsessao(sessaoService.getLastCurrentSessao());
            mv.addObject(getATTRIBUTE_NAME(), o);
            mv.addObject("autistas", autistaService.listar());
            mv.addObject("tutores", tutorService.listar());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return mv;
    }

    @GetMapping("/conf-select")
    public ModelAndView mvConfSelect(){
        ModelAndView mv = new ModelAndView("configuracoesSelect");
        try {
            mv.addObject("entitys", configuracaoService.listar());
        } catch (Exception e){
            e.printStackTrace();
        }
        return mv;
    }

    @PostMapping("/conf")
    public ModelAndView mvConf(@ModelAttribute @Valid Autista autista, @NotNull BindingResult bindingResult, Principal principal){
        if (bindingResult.hasErrors()) {
            return new ModelAndView("redirect:invalid-request");
        }

        Sessao sessao = new Sessao();
        sessao.setIdautista(autista);
        sessao.setIdtutor(tutorService.findByUsuario(principal.getName()));
        sessao.setDatalogin(new Date(System.currentTimeMillis()));
        sessaoService.salvar(sessao);

        return new ModelAndView("redirect:conf-select");
    }

    @GetMapping("/invalid-request")
    public ModelAndView mvIvalidRequest(){
        return new ModelAndView("error/400");
    }
}

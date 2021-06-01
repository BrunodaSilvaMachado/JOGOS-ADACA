package br.com.adaca.controller;

import br.com.adaca.model.Autista;
import br.com.adaca.service.AutistaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@RestController
@RequestMapping("/")
public class LoginController {

    @Autowired
    private AutistaService autistaService;

    @GetMapping("/")
    public ModelAndView index(){return new ModelAndView("redirect:Jogos/login");}

    @GetMapping("Jogos/login")
    public ModelAndView loginForm() {
        return new ModelAndView("index");
    }

    @GetMapping("Jogos/selecionarCrianca")
    ModelAndView selecionarCrianca(Principal principal){
        ModelAndView mv = new ModelAndView("selecionarCrianca");
        mv.addObject("user",principal.getName());
        mv.addObject("entity",new Autista());

        try {
            mv.addObject("autistas", autistaService.listar());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return mv;
    }

    @GetMapping("Jogos/painel")
    public ModelAndView  painel(){
        return new ModelAndView("painel");
    }

    @GetMapping("/access-denied")
    ModelAndView acessDenied() {
        return new ModelAndView("error/403");
    }
}

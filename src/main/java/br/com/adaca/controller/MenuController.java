package br.com.adaca.controller;

import br.com.adaca.model.Configuracao;
import br.com.adaca.service.ConfiguracaoService;
import br.com.adaca.service.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/Jogos/menu")
public class MenuController {
    @Autowired
    private
    ConfiguracaoService configuracaoService;

    @GetMapping("/all")
    public ModelAndView menuAll(ModelMap model){
        Configuracao configuracao = configuracaoService.selecionar(1);
        configuracao.setIdsessao(new SessaoService().getLastCurrentSessao());
        model.addAttribute("", configuracao.toString());
        return new ModelAndView("redirect:/Jogos/menu/",model);
    }

    @GetMapping("/")
    public ModelAndView accessMenu(ModelMap model) {
        return new ModelAndView("Webapps/menu",model);
    }

    @GetMapping("/{directory}/{entrance}")
    public ModelAndView mudaJogo(@PathVariable("directory") String directory, @PathVariable("entrance") String entrance,
                                 @RequestParam(value = "query",required = false) String query){
        String viewDirectoryEntrance = "Webapps" + "/" + directory + "/" + entrance;
        return new ModelAndView(viewDirectoryEntrance,"query",query);
    }

}

package br.com.adaca.view;

import br.com.adaca.exception.NotFoundException;
import br.com.adaca.util.BaseId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author Bruno da Silva Machado
 * @version 1.1
 */
@Getter
@Setter
@AllArgsConstructor
public abstract class View<O extends BaseId> {

    private final String ATTRIBUTE_NAME = "entitys";

    private String homeViewName;

    private String addViewName;

    protected abstract ResponseEntity<List<O>> listar();

    protected abstract ResponseEntity<O> selecionar(Integer integer);

    protected abstract ResponseEntity salvar(O o);

    protected abstract ResponseEntity<O> alterar(O o);

    protected abstract ResponseEntity remover(Integer integer);

    protected abstract ResponseEntity remover(O o);

    /**
     * @return uma lista de objetos do tipo <O>
     */
    @GetMapping("/list")
    private ModelAndView mvListar() {
        ModelAndView mv = new ModelAndView(homeViewName);

        try {
            mv.addObject(ATTRIBUTE_NAME, listar().getBody());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return mv;
    }

    /**
     * @param id identidade
     * @return o objeto do tipo <O> associado ao id
     */
    @GetMapping("/list/{id}")
    protected ModelAndView mvSelecionar(@PathVariable("id") Integer id) {
        ModelAndView mv = new ModelAndView(homeViewName);
        mv.addObject(ATTRIBUTE_NAME, selecionar(id).getBody());

        return mv;
    }

    /**
     * @param o uma objeto <O> a ser adicionado
     * @return ModelAndView da pagina de adicao
     */
    @GetMapping("/add")
    protected ModelAndView mvAdd(O o) {
        ModelAndView mv = new ModelAndView(addViewName);
        mv.addObject(ATTRIBUTE_NAME, o);

        return mv;
    }

    /**
     * Modifica o objeto apartir do id
     *
     * @param id identificador
     * @return ModelAndView de edicao
     */
    @GetMapping("/edit/{id}")
    protected ModelAndView mvAlterar(@PathVariable("id") Integer id) {
        return mvAdd(selecionar(id).getBody());
    }

    /**
     * Remove um objeto
     *
     * @param id identificador
     * @return ModelAndView de listagem
     */
    @GetMapping("/delete/{id}")
    protected ModelAndView mvRemover(@PathVariable("id") Integer id) {
        remover(id);
        return mvListar();
    }

    /**
     * Salva um objeto
     *
     * @param o             a valid model attribute
     * @param bindingResult result
     * @return ModelAndView home
     */
    @PostMapping("/save")
    protected ModelAndView mvSave(@ModelAttribute @Valid O o, @NotNull BindingResult bindingResult) {
        List<O> oList = null;

        if (bindingResult.hasErrors()) {
            return mvAdd(o);
        }

        try {
            oList = listar().getBody();
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        if (oList != null) {
            for (O adm : oList) {
                if (adm.getId().equals(o.getId())) {
                    alterar(o);
                    return new ModelAndView("redirect:list");
                }
            }
        }

        salvar(o);
        return new ModelAndView("redirect:list");
    }
}

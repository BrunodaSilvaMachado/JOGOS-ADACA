package br.com.adaca.handler;

import br.com.adaca.exception.NotFoundException;
import br.com.adaca.service.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Controller
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    @Autowired
    private SessaoService sessaoService;

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (authentication != null && authentication.getDetails() != null){
            try{
                request.getSession().invalidate();
                br.com.adaca.model.Sessao sessao = sessaoService.getLastCurrentSessao();
                sessao.setDatalogout(new Date());
                sessaoService.alterar(sessao);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        response.setStatus(HttpServletResponse.SC_OK);
        response.sendRedirect(request.getContextPath() + "/Jogos/login");
    }
}

package org.paasta.container.platform.web.admin.intro;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.paasta.container.platform.web.admin.common.ConstantsUrl;
import org.paasta.container.platform.web.admin.config.NoAuth;
import org.paasta.container.platform.web.admin.login.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;


/**
 * Intro Overview Controller 클래스
 *
 * @author jjy
 * @version 1.0
 * @since 2021.05.06
 */
@Api(value = "IntroOverviewController v1")
@Controller
public class IntroOverviewController {

    private final LoginService loginService;

    @Autowired
    public IntroOverviewController(LoginService loginService) {
        this.loginService = loginService;
    }


    /**
     * index 페이지 이동(Move Intro overview page)
     *
     * @return the view
     */
    @ApiOperation(value = "Intro overview 페이지 이동(Move Intro overview page)", nickname = "indexView")
    @GetMapping("/")
    @NoAuth
    public RedirectView baseView() {
        return new RedirectView(ConstantsUrl.URI_CP_INDEX_URL);
    }

    /**
     * Index 페이지 이동(Move Intro overview page)
     *
     * @return the intro overview
     */
    @ApiOperation(value = "Intro overview 페이지 이동(Move Intro overview page)", nickname = "getIntroOverview")
    @GetMapping(value = ConstantsUrl.URI_CP_INDEX_URL)
    public String getIntroOverview() {
        return "index";
    }
}


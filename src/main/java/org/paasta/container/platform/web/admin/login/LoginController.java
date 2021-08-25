package org.paasta.container.platform.web.admin.login;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.paasta.container.platform.web.admin.common.ConstantsUrl;
import org.paasta.container.platform.web.admin.common.CustomIntercepterService;
import org.paasta.container.platform.web.admin.login.model.UsersLoginMetaData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Login Controller 클래스
 *
 * @author kjhoon
 * @version 1.0
 * @since 2021.06.15
 **/
@Api(value = "LoginController v1")
@RestController
public class LoginController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LoginController.class);

    private final LoginService loginService;
    private final ProviderService providerService;
    private final CustomIntercepterService customIntercepterService;


    @Autowired
    public LoginController(LoginService loginService, ProviderService providerService, CustomIntercepterService customIntercepterService) {
        this.loginService = loginService;
        this.providerService = providerService;
        this.customIntercepterService = customIntercepterService;
    }


    /**
     * User Session 데이터 조회
     *
     * @return the resultStatus
     */
    @ApiOperation(value = "User Session 데이터 조회 ", nickname = "UpdateSelectedNamespace")
    @GetMapping(value = ConstantsUrl.URI_CP_GET_USER_LOGIN_DATA)
    @ResponseBody
    public UsersLoginMetaData getAdminLoginData() {
        UsersLoginMetaData usersLoginMetaData = loginService.getAuthenticationUserMetaData();
        return usersLoginMetaData;
    }


    /**
     * User Refresh Token 조회
     *
     * @return the usersLoginMetaData
     */
    @ApiOperation(value = " User Refresh Token 조회", nickname = "getRefreshToken")
    @GetMapping(value = ConstantsUrl.URI_CP_REFRESH_TOKEN)
    @ResponseBody
    public UsersLoginMetaData getReFreshToken() {
        providerService.getRefreshToken();
        UsersLoginMetaData usersLoginMetaData = loginService.getAuthenticationUserMetaData();
        return usersLoginMetaData;
    }

    /**
     * User 로그아웃 (User Logout)
     *
     */
    @ApiOperation(value = "User 로그아웃 (User Logout)", nickname = "logoutUsers")
    @GetMapping(value = ConstantsUrl.URI_CP_LOGOUT)
    public void logoutUsers(HttpServletRequest request, HttpServletResponse response) {

        try {
            customIntercepterService.logout();
            request.getSession().invalidate();

            response.sendRedirect(ConstantsUrl.URI_CP_SESSION_OUT);
            return ;
        }
        catch (Exception e) {
        }
    }

}

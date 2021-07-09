package org.paasta.container.platform.web.admin.login;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.paasta.container.platform.web.admin.common.ConstantsUrl;
import org.paasta.container.platform.web.admin.login.model.UsersLoginMetaData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


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


    @Autowired
    public LoginController(LoginService loginService, ProviderService providerService) {
        this.loginService = loginService;
        this.providerService = providerService;
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

}

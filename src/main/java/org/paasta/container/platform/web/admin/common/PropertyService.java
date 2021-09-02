package org.paasta.container.platform.web.admin.common;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Property Service 클래스
 *
 * @author jjy
 * @version 1.0
 * @since 2020.08.25
 */
@Service
@Data
public class PropertyService {

    @Value("${cp.cluster.url}")
    private String cpUrl;

    @Value("${cp.cluster.name}")
    private String cpClusterName;

    @Value("${cp.namespace.default}")
    private String cpDefaultNamespace;

    @Value("${cpApi.url}")
    private String cpApiUrl;

    @Value("${commonApi.url}")
    private String commonApiUrl;

    @Value("${private.registry.imageName}")
    private String privateRegistryImageName;

    @Value("${keycloak.oauth.client.clusterAdminRole}")
    private String keycloakClusterAdminRole;

}

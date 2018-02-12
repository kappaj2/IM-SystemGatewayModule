package za.co.ajk.systemgateway.cucumber.stepdefs;

import za.co.ajk.systemgateway.SystemGatewayModuleApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = SystemGatewayModuleApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}

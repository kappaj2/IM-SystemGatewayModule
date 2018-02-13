package za.co.ajk.systemgateway.config.cmdline;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import za.co.ajk.systemgateway.messaging.googlepubsub.GoogleAdminManager;


/**
 * This class will do the required configuration checks when the application starts up.
 * Currently it will check and configure the Google PubSub environment.
 */
@Component
public class ApplicationConfigChecker implements CommandLineRunner{
    
    private final Logger log = LoggerFactory.getLogger(getClass());
    
    @Autowired
    private GoogleAdminManager googleAdminManager;
    
    @Override
    public void run(String... strings) throws Exception {
        log.info("Running CommandLineRunner");
        googleAdminManager.checkTopics();
        Thread.sleep(10000l);
        googleAdminManager.checkSubscriptions();
        log.info("$$$$$$$$$$    Completed PubSub verification   $$$$$$$$$$");
    }
}

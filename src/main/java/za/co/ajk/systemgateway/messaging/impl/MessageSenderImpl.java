package za.co.ajk.systemgateway.messaging.impl;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.ObjectMapper;
import za.co.ajk.systemgateway.enums.EventType;
import za.co.ajk.systemgateway.enums.IncidentPriority;
import za.co.ajk.systemgateway.enums.PubSubMessageType;
import za.co.ajk.systemgateway.messaging.InterModulePubSubMessage;
import za.co.ajk.systemgateway.messaging.MessageSender;
import za.co.ajk.systemgateway.messaging.googlepubsub.GoogleChannelManager;


/**
 * Utility class that will send a message to the different topics configured for the module and message type.
 */
//@Service
public class MessageSenderImpl implements MessageSender {
    
    private GoogleChannelManager googleChannelManager;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    public MessageSenderImpl(GoogleChannelManager googleChannelManager) {
        this.googleChannelManager = googleChannelManager;
    }
    
    @Override
    public void sendTestMessage() throws Exception {
        
        InterModulePubSubMessage interModulePubSubMessage = new InterModulePubSubMessage();
        
        interModulePubSubMessage.setEventType(EventType.START_EVENT);
        interModulePubSubMessage
            .setIncidentDescription("Die ding het ontplof en die hele wereld aan die brand gesteek...");
        interModulePubSubMessage.setIncidentHeader("Die ding het ontplof");
        interModulePubSubMessage.setIncidentNumber(100L);
        interModulePubSubMessage.setIncidentPriority(IncidentPriority.CRITICAL);
        interModulePubSubMessage.setMessageDateCreated(Instant.now());
        interModulePubSubMessage.setOperatorName("Andre");
        interModulePubSubMessage.setOriginatingApplicationModuleName("TestModule");
        interModulePubSubMessage.setPubSubMessageType(PubSubMessageType.GENERIC);
        
        String obj = objectMapper.writeValueAsString(interModulePubSubMessage);
        
        googleChannelManager.pubSubMessageSender(interModulePubSubMessage);
    }
    
    @Override
    public void sendObjMessage(InterModulePubSubMessage interModulePubSubMessage) {
        googleChannelManager.pubSubMessageSender(interModulePubSubMessage);
    }
}

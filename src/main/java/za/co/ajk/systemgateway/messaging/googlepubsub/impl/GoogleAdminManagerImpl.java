package za.co.ajk.systemgateway.messaging.googlepubsub.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.pubsub.PubSubAdmin;

import com.google.pubsub.v1.Subscription;
import com.google.pubsub.v1.SubscriptionName;
import com.google.pubsub.v1.Topic;
import com.google.pubsub.v1.TopicName;
import za.co.ajk.systemgateway.config.PubSubMessagingProperties;
import za.co.ajk.systemgateway.messaging.googlepubsub.GoogleAdminManager;


//@Component
public class GoogleAdminManagerImpl implements GoogleAdminManager {
    
    private static Logger log = LoggerFactory.getLogger(GoogleAdminManagerImpl.class);
    
    private PubSubMessagingProperties pubSubMessagingProperties;
    private PubSubAdmin pubSubAdmin;
    
    @Autowired
    public GoogleAdminManagerImpl(PubSubMessagingProperties pubSubMessagingProperties,
                                  PubSubAdmin pubSubAdmin) {
        this.pubSubMessagingProperties = pubSubMessagingProperties;
        this.pubSubAdmin = pubSubAdmin;
    }
    
    @Override
    public void checkTopics() {
        
        List<String> topicNamesList = pubSubMessagingProperties.getTopicsRequired().getTopicNames();
        List<String> existingTopicList = getExistingTopics();
        
        topicNamesList.forEach(topicName -> {
            boolean exists = checkTopicExists(existingTopicList, topicName);
            if (!exists) {
                createTopic(topicName);
            }
        });
    }
    
    @Override
    public void checkSubscriptions() {
        List<PubSubMessagingProperties.Subscriptions> subscriptionsList = pubSubMessagingProperties.getSubscriptions();
        List<String> existingSubscriptionsList = getExistingSubscriptions();
        
        subscriptionsList.forEach(sub -> {
            boolean exists = checkSubscriptionExists(existingSubscriptionsList, sub.getSubscriptionName());
            log.info("Checking Topic : "+sub.getTopicName()+" for subscription : "+sub.getSubscriptionName()+ " exists : "+exists);
            
            if (!exists) {
                createSubscription(sub.getTopicName(), sub.getSubscriptionName());
            }
        });
    }
    
    private boolean checkTopicExists(List<String> topicsList, String topicName) {
        return topicsList.stream().anyMatch(top -> top.equalsIgnoreCase(topicName));
    }
    
    private boolean checkSubscriptionExists(List<String> subscriptionList, String subscriptionName) {
        return subscriptionList.stream().anyMatch(sub -> sub.equalsIgnoreCase(subscriptionName));
    }
    
    private List<String> getExistingTopics() {
        return pubSubAdmin.listTopics()
            .stream()
            .map(Topic::getNameAsTopicName)
            .map(TopicName::getTopic)
            .collect(Collectors.toList());
    }
    
    private List<String> getExistingSubscriptions() {
        return pubSubAdmin.listSubscriptions()
            .stream()
            .map(Subscription::getNameAsSubscriptionName)
            .map(SubscriptionName::getSubscription)
            .collect(Collectors.toList());
    }
    
    private void createTopic(String topicName) {
        pubSubAdmin.createTopic(topicName);
    }
    
    private void createSubscription(String topicName, String subscriptionName) {
        pubSubAdmin.createSubscription(subscriptionName, topicName);
        try{
            Thread.sleep(2000l);
        }catch(InterruptedException ie){
        
        }
    }
    
}

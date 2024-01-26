package org.infosystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        try {
            String envFilePath = ".env";
            FileInputStream input = new FileInputStream(envFilePath);
            Properties envProps = new Properties();
            envProps.load(input);
            input.close();

            System.getProperties().putAll(envProps);
        } catch (IOException ex) {
            ex.printStackTrace();
           throw new RuntimeException("Failed to load .env file", ex);
        }

        SpringApplication.run(Application.class, args);
    }
}

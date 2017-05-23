Feature: Cucumber test

@simple_web
    Scenario: I want save form page
        Given user navigates to 'http://localhost:9000'        
        When user fills 'FormRender-InputName' by replacing text with 'led zeppelin wikipedia'
        And user fills 'FormRender-InputCpf' by replacing text with '329.118.080-72'
        And user fills 'FormRender-InputTelefone' by replacing text with '(11) 99292-2727'
        And user clicks on 'FormRender-ButtonSave'
        And user waits for 5 seconds

@simple_web
    Scenario: I want save form page with invalid data
        Given user navigates to 'http://localhost:9000'        
        When user fills 'FormRender-InputName' by replacing text with 'Qualquer nome'
        And user fills 'FormRender-InputTelefone' by replacing text with '99292-2727'
        And user clicks on 'FormRender-ButtonSave'
        And user waits for 5 seconds
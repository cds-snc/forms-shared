
let content = "<h2>Form Best Practices</h2>";
content+= "<p>Let's first go over some best practices for designing forms. When done right, a form should feel like a friendly conversation between the user and the app. The following best practices will help you improve your designs and increase completion rates.</p>";
content+="...... your content here";
content+= "<h2>Form inputs</h2>";
content+="<strong>Radio buttons</strong>";
content+="<p>These are used when there are one or multiple predefined options. They allow users to make a single selection in an exposed list. Radio buttons are best used when there are 4 or less options to choose form.</p>";

content+='<img width="500" src="https://miro.medium.com/max/2780/1*x-HWMl9KjdcVGIWepqQ2Aw.gif" />';


jQuery(document).ready(function($){
  $("#no-fields").html("<div>"+content+"</div>").show();
  $("li input[data-type='name']").parent().remove();
  $("li input[data-type='multiselect']").parent().remove();
  $("li input[data-type='number']").parent().remove();
  $("li input[data-type='hidden']").parent().remove();
  $("li input[data-type='section']").parent().remove();
  $("li input[data-type='html']").parent().remove();
  $("li input[data-type='fileupload']").parent().remove();
  $("li input[data-type='captcha']").parent().remove();
  $("li input[data-type='consent']").parent().remove();
  $("li input[data-type='list']").parent().remove();

  $("#add_post_fields").html("");
  $("#add_pricing_fields").html("");
  $("#add_standard_fields").html('<div><h3>Let\'s make a form</h3><button id="test-button" style=";" class="button button-large">Add text field</button><hr><div>');
  $("#add_advanced_fields").html("");

  $("#test-button").click(function(){
    StartAddField("text")
  })

 
  

});
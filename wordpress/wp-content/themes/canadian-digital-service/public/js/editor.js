
let content = "<h2>Tutorials</h2>";
content+= '<p><iframe width="560" height="315" src="https://www.youtube.com/embed/6aQiOX5eDxY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>';


jQuery(document).ready(function($){
  $("#no-fields").html("<div>"+content+"</div>").show();
  $("li input[data-type='name']").parent().remove();
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

  $("li input[data-type='radio']").val("Multiple Choice");

  $("#add_post_fields").html("");
  $("#add_pricing_fields").html("");
});
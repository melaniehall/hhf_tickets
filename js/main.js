(function(){

  "use strict";

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $("#submit").click(buildUrl);
    $("#submit").click(calculateTotal);
    $("input").change(calculateTotal);
    $("#registration").change(setDefaultRegistrationValue);
  }

  function setDefaultRegistrationValue(){
    $("input[name=quantity]").val(1);
    calculateTotal();
  }

  function calculateRegistration(){
    var rate = 20;
    var total = 0;
    var quantity = findQuantity();

    total = rate * quantity;

    return total;
  }

  function findQuantity(){
    var quantity = parseInt($("#quantity").val());
    return (isNaN(quantity)) ? 0 : quantity;
  }

  function calculateOtherContribution(){
    var otherContribution = 0;
    var $amount = parseInt($("input[name=other_amount]").val().replace(/\$/g, ''));
    otherContribution = (isNaN($amount)) ? 0 : $amount;
    return otherContribution;
  }

  function calculateTotal(){
    var registrationTotal = calculateRegistration();
    var otherContributionTotal = calculateOtherContribution();
    var total = registrationTotal + otherContributionTotal;
    $("#total").text(total);
  }

  function buildUrl(){
    var items = 0;
    var registrationAmount = 20;
    var $quantity = findQuantity();

    var otherContributionAmount = calculateOtherContribution();

    var url = "http://hhf.kindful.com/widget?campaign_id=4366&schedule=0&success_url=http%3A//hannehowardfund.org/&cart[desc]=Sunset"
    url += " Salutations for Africa";
    if ($quantity > 0){
      items ++;
      url += "&cart[items]["+items+"][amount]="+registrationAmount;
      url += "&cart[items]["+items+"][desc]=Sunset Salutations for Africa Ticket"
      url += "&cart[items]["+items+"][product_id]=sunset_salutations_for_africa_ticket"
      url += "&cart[items]["+items+"][quantity]="+$quantity;
    }
    if (otherContributionAmount > 0){
      items ++
      url += "&cart[items]["+items+"][amount]="+otherContributionAmount;
      url += "&cart[items]["+items+"][desc]=Additional Donation";
      url += "&cart[items]["+items+"][product_id]=additional_donation";
      url += "&cart[items]["+items+"][quantity]=1";
    }
    if (items > 0){
      window.location.href = url;
    }
  }

})();

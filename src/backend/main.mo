actor {
  type PaymentConfig = {
    upiId : Text;
    payeeName : Text;
    paymentPurpose : Text;
  };

  var paymentConfig : ?PaymentConfig = null;

  public shared ({ caller }) func setPaymentConfig(newConfig : PaymentConfig) : async () {
    paymentConfig := ?newConfig;
  };

  public query ({ caller }) func getPaymentConfig() : async ?PaymentConfig {
    paymentConfig;
  };
};

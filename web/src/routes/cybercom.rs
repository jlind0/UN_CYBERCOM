use tuono_lib::{Request, Response, Props};
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Debug, Serialize, Deserialize)]
struct SubscriptionData{
    subscription_id: u64 
}

#[tuono_lib::handler]
async fn load(_req: Request) -> Response {
  let data = SubscriptionData{
    subscription_id: env::var("CHAINLINK_VRF_SUBSCRIPTION_ID").expect("CHAINLINK_VRF_SUBSCRIPTION_ID not found").parse().expect("Failed to parse API_KEY as u64")
  };
  Response::Props(Props::new(data))
}
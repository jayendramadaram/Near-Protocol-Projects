use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize  };
use near_sdk::collections::{ UnorderedMap};
use near_sdk::{near_bindgen, AccountId , env, };

// near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct  Contract{
    pub msgs : UnorderedMap<AccountId , String>,
}

// #[near_bindgen]
impl Default for Contract {
    fn default() -> Self {
        Self {
            msgs: UnorderedMap::new(b"r".to_vec())
        }
    }
}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn setMSG(&mut self ,msg : String) -> u128 {
        // if near_sdk::env::attached_deposit() < ONE_NEAR*2 {
        //     near_sdk::env::panic_str("DUDE your sending  less near min 2 ");
        // }
        self.msgs.insert(&env::predecessor_account_id(), &msg);
        env::log_str("created or updated");
        near_sdk::env::attached_deposit()
    }

    pub fn GetMSGS(&self) -> Vec<(AccountId , String)> {
        let keys = self.msgs.keys_as_vector();
        let strs = self.msgs.values_as_vector();
        (0..self.msgs.len()).map(|index| (keys.get(index).unwrap() , strs.get(index).unwrap())).collect()
    }

    pub fn DeleteWhole(&mut self) {
        self.msgs.clear();
    }

    pub fn Delete_Mine(&mut self) {
        self.msgs.remove(&env::predecessor_account_id());
        env::log_str("Deleted Accountmsg");
    }
}

#[cfg(not(target_arch = "wasm32"))]
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};
    use near_sdk::test_utils::{accounts ,VMContextBuilder};

    
    fn get_context(is_view: bool) -> VMContext {
        VMContextBuilder::new()
        .current_account_id(accounts(0))
            .signer_account_id("bob.near".parse().unwrap())
            .is_view(is_view)
            .build()
    }

    #[test]
    fn my_test() {
        let context = get_context(false);
        testing_env!(context);
        // ... Write test here
        let mut contract = Contract::default();
        let muney = contract.setMSG("Triffiny".to_string());
        println!("{}" , muney);
        let (key , val) = &contract.GetMSGS()[0];
        env::log_str(format!("{} and val {}" , muney , val ).as_str());
        assert_eq!("Triffiny" , val.as_str());
        assert_eq!("bob.near".parse::<AccountId>().unwrap() , *key);

    }
}


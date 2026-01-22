program reputation_ghostlance_6789.aleo {

// Reputation Contract
// Privately updates delivery stats and reputation

// Reputation structure
struct Reputation {
    freelancer: address,
    total_jobs_completed: u64,
    on_time_deliveries: u64,
    late_deliveries: u64,
    delivery_rate: u32,  // Percentage (0-100)
    total_earnings: u64,
    encrypted_feedback: field,  // Encrypted feedback data
}

// Mappings
mapping reputations: address => Reputation;

@noupgrade
async constructor() {}

// Async function to initialize reputation
async function initialize_reputation_internal(freelancer: address) {
    let reputation = Reputation {
        freelancer: freelancer,
        total_jobs_completed: 0u64,
        on_time_deliveries: 0u64,
        late_deliveries: 0u64,
        delivery_rate: 100u32,  // Start at 100%
        total_earnings: 0u64,
        encrypted_feedback: 0field,
    };
    
    Mapping::set(reputations, freelancer, reputation);
}

// Initialize reputation (first time)
async transition initialize_reputation(freelancer: address) -> Future {
    return initialize_reputation_internal(freelancer);
}

// Get reputation
async transition get_reputation(freelancer: address) -> Future {
    let f: Future = async {
        Mapping::get_or_use(
            reputations,
            freelancer,
            Reputation {
                freelancer: freelancer,
                total_jobs_completed: 0u64,
                on_time_deliveries: 0u64,
                late_deliveries: 0u64,
                delivery_rate: 100u32,
                total_earnings: 0u64,
                encrypted_feedback: 0field,
            }
        );
    };
    return f;
}

// Async function to update reputation
async function update_reputation_internal(
    freelancer: address,
    was_on_time: bool,
    earnings: u64
) {
    let reputation = Mapping::get_or_use(
        reputations,
        freelancer,
        Reputation {
            freelancer: freelancer,
            total_jobs_completed: 0u64,
            on_time_deliveries: 0u64,
            late_deliveries: 0u64,
            delivery_rate: 100u32,
            total_earnings: 0u64,
            encrypted_feedback: 0field,
        }
    );
    
    let new_total = reputation.total_jobs_completed + 1u64;
    let new_on_time = was_on_time ? reputation.on_time_deliveries + 1u64 : reputation.on_time_deliveries;
    let new_late = was_on_time ? reputation.late_deliveries : reputation.late_deliveries + 1u64;
    
    // Calculate delivery rate (percentage)
    let new_rate = (new_on_time * 100u64) / new_total;
    let new_rate_u32: u32 = new_rate as u32;
    
    let updated_reputation = Reputation {
        freelancer: reputation.freelancer,
        total_jobs_completed: new_total,
        on_time_deliveries: new_on_time,
        late_deliveries: new_late,
        delivery_rate: new_rate_u32,
        total_earnings: reputation.total_earnings + earnings,
        encrypted_feedback: reputation.encrypted_feedback,
    };
    
    Mapping::set(reputations, freelancer, updated_reputation);
}

// Update reputation after job completion
async transition update_reputation(
    freelancer: address,
    was_on_time: bool,
    earnings: u64
) -> Future {
    return update_reputation_internal(freelancer, was_on_time, earnings);
}

// Async function to update feedback
async function update_feedback_internal(
    freelancer: address,
    encrypted_feedback: field
) {
    let reputation = Mapping::get(reputations, freelancer);
    let updated_reputation = Reputation {
        freelancer: reputation.freelancer,
        total_jobs_completed: reputation.total_jobs_completed,
        on_time_deliveries: reputation.on_time_deliveries,
        late_deliveries: reputation.late_deliveries,
        delivery_rate: reputation.delivery_rate,
        total_earnings: reputation.total_earnings,
        encrypted_feedback: encrypted_feedback,
    };
    Mapping::set(reputations, freelancer, updated_reputation);
}

// Update encrypted feedback
async transition update_feedback(
    freelancer: address,
    encrypted_feedback: field
) -> Future {
    return update_feedback_internal(freelancer, encrypted_feedback);
}

}

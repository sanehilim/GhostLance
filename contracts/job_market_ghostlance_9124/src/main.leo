program job_market_ghostlance_9124.aleo {

// Job Market Contract
// Handles job creation, applications, and proof requirements

// Job structure
struct Job {
    job_id: u64,
    client: address,
    title: field,  // Encrypted job title
    description: field,  // Encrypted job description
    budget: u64,  // Budget in microcredits
    deadline: u64,  // Unix timestamp
    required_skill_proofs: field,  // Encrypted list of required proof IDs
    required_experience_proof: u64,  // Experience proof ID requirement
    status: u8,  // 0: open, 1: filled, 2: closed
    created_at: u64,
}

// Application structure
struct Application {
    application_id: u64,
    job_id: u64,
    freelancer: address,
    bid_amount: u64,  // Encrypted bid
    skill_proofs: field,  // Encrypted list of proof IDs
    experience_proof: u64,
    proposal: field,  // Encrypted proposal text
    status: u8,  // 0: pending, 1: accepted, 2: rejected
    created_at: u64,
}

// Mappings
mapping jobs: u64 => Job;
mapping applications: u64 => Application;
mapping job_applications: u64 => field;  // job_id => encrypted list of application IDs

// Counters
mapping job_counter: u8 => u64;
mapping application_counter: u8 => u64;

@noupgrade
async constructor() {}

// Async function to create job
async function create_job_internal(
    client: address,
    title: field,
    description: field,
    budget: u64,
    deadline: u64,
    required_skill_proofs: field,
    required_experience_proof: u64
) {
    let current_counter = Mapping::get_or_use(job_counter, 0u8, 0u64);
    let job_id: u64 = current_counter + 1u64;
    Mapping::set(job_counter, 0u8, job_id);
    
    let job = Job {
        job_id: job_id,
        client: client,
        title: title,
        description: description,
        budget: budget,
        deadline: deadline,
        required_skill_proofs: required_skill_proofs,
        required_experience_proof: required_experience_proof,
        status: 0u8,  // open
        created_at: 0u64,  // Will be set by frontend
    };
    
    Mapping::set(jobs, job_id, job);
}

// Create a new job
async transition create_job(
    client: address,
    title: field,
    description: field,
    budget: u64,
    deadline: u64,
    required_skill_proofs: field,
    required_experience_proof: u64
) -> Future {
    return create_job_internal(client, title, description, budget, deadline, required_skill_proofs, required_experience_proof);
}

// Get job details
async transition get_job(job_id: u64) -> Future {
    let f: Future = async {
        Mapping::get(jobs, job_id);
    };
    return f;
}

// Async function to apply to job
async function apply_to_job_internal(
    job_id: u64,
    freelancer: address,
    bid_amount: u64,
    skill_proofs: field,
    experience_proof: u64,
    proposal: field
) {
    let job = Mapping::get(jobs, job_id);
    let job_status = job.status;
    let is_open = job_status == 0u8;
    
    let current_counter = Mapping::get_or_use(application_counter, 0u8, 0u64);
    let app_id: u64 = current_counter + 1u64;
    Mapping::set(application_counter, 0u8, app_id);
    
    if is_open {
        let application = Application {
            application_id: app_id,
            job_id: job_id,
            freelancer: freelancer,
            bid_amount: bid_amount,
            skill_proofs: skill_proofs,
            experience_proof: experience_proof,
            proposal: proposal,
            status: 0u8,  // pending
            created_at: 0u64,  // Will be set by frontend
        };
        
        Mapping::set(applications, app_id, application);
    }
}

// Apply to a job
async transition apply_to_job(
    job_id: u64,
    freelancer: address,
    bid_amount: u64,
    skill_proofs: field,
    experience_proof: u64,
    proposal: field
) -> Future {
    return apply_to_job_internal(job_id, freelancer, bid_amount, skill_proofs, experience_proof, proposal);
}

// Get application
async transition get_application(application_id: u64) -> Future {
    let f: Future = async {
        Mapping::get(applications, application_id);
    };
    return f;
}

// Async function to accept application
async function accept_application_internal(
    job_id: u64,
    application_id: u64
) {
    let job = Mapping::get(jobs, job_id);
    let application = Mapping::get(applications, application_id);
    
    let app_job_id = application.job_id;
    let job_matches = app_job_id == job_id;
    let app_status = application.status;
    let is_pending = app_status == 0u8;
    let can_accept = job_matches && is_pending;
    
    if can_accept {
        // Update application status
        let updated_application = Application {
            application_id: application.application_id,
            job_id: application.job_id,
            freelancer: application.freelancer,
            bid_amount: application.bid_amount,
            skill_proofs: application.skill_proofs,
            experience_proof: application.experience_proof,
            proposal: application.proposal,
            status: 1u8,  // accepted
            created_at: application.created_at,
        };
        Mapping::set(applications, application_id, updated_application);
        
        // Update job status
        let updated_job = Job {
            job_id: job.job_id,
            client: job.client,
            title: job.title,
            description: job.description,
            budget: job.budget,
            deadline: job.deadline,
            required_skill_proofs: job.required_skill_proofs,
            required_experience_proof: job.required_experience_proof,
            status: 1u8,  // filled
            created_at: job.created_at,
        };
        Mapping::set(jobs, job_id, updated_job);
    }
}

// Accept application (client action)
async transition accept_application(
    job_id: u64,
    application_id: u64
) -> Future {
    return accept_application_internal(job_id, application_id);
}

// Async function to close job
async function close_job_internal(job_id: u64) {
    let job = Mapping::get(jobs, job_id);
    let updated_job = Job {
        job_id: job.job_id,
        client: job.client,
        title: job.title,
        description: job.description,
        budget: job.budget,
        deadline: job.deadline,
        required_skill_proofs: job.required_skill_proofs,
        required_experience_proof: job.required_experience_proof,
        status: 2u8,  // closed
        created_at: job.created_at,
    };
    Mapping::set(jobs, job_id, updated_job);
}

// Close job (client action)
async transition close_job(job_id: u64) -> Future {
    return close_job_internal(job_id);
}

}

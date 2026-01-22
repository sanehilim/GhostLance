program proof_generator_ghostlance_7832.aleo {

// Proof Generator Contract
// Generates ZK proofs for freelancer skills and experience

// Proof structure
struct SkillProof {
    freelancer: address,
    skill_name: field,
    skill_level: u32,
    proof_hash: field,
}

struct ExperienceProof {
    freelancer: address,
    min_jobs_completed: u64,
    min_delivery_rate: u32,
    proof_hash: field,
}

// Mapping: proof_id => proof data
mapping skill_proofs: u64 => SkillProof;
mapping experience_proofs: u64 => ExperienceProof;

// Counters for unique proof IDs
mapping skill_proof_counter: u8 => u64;
mapping experience_proof_counter: u8 => u64;

@noupgrade
async constructor() {}

// Async function to generate skill proof
async function generate_skill_proof_internal(
    freelancer: address,
    skill_name: field,
    skill_level: u32,
    proof_hash: field
) {
    let current_counter = Mapping::get_or_use(skill_proof_counter, 0u8, 0u64);
    let proof_id: u64 = current_counter + 1u64;
    Mapping::set(skill_proof_counter, 0u8, proof_id);
    
    let proof = SkillProof {
        freelancer: freelancer,
        skill_name: skill_name,
        skill_level: skill_level,
        proof_hash: proof_hash,
    };
    
    Mapping::set(skill_proofs, proof_id, proof);
}

// Generate skill proof
async transition generate_skill_proof(
    freelancer: address,
    skill_name: field,
    skill_level: u32,
    proof_hash: field
) -> Future {
    return generate_skill_proof_internal(freelancer, skill_name, skill_level, proof_hash);
}

// Async function to generate experience proof
async function generate_experience_proof_internal(
    freelancer: address,
    min_jobs_completed: u64,
    min_delivery_rate: u32,
    proof_hash: field
) {
    let current_counter = Mapping::get_or_use(experience_proof_counter, 0u8, 0u64);
    let proof_id: u64 = current_counter + 1u64;
    Mapping::set(experience_proof_counter, 0u8, proof_id);
    
    let proof = ExperienceProof {
        freelancer: freelancer,
        min_jobs_completed: min_jobs_completed,
        min_delivery_rate: min_delivery_rate,
        proof_hash: proof_hash,
    };
    
    Mapping::set(experience_proofs, proof_id, proof);
}

// Generate experience proof
async transition generate_experience_proof(
    freelancer: address,
    min_jobs_completed: u64,
    min_delivery_rate: u32,
    proof_hash: field
) -> Future {
    return generate_experience_proof_internal(freelancer, min_jobs_completed, min_delivery_rate, proof_hash);
}

// Get skill proof
async transition get_skill_proof(proof_id: u64) -> Future {
    let f: Future = async {
        Mapping::get(skill_proofs, proof_id);
    };
    return f;
}

// Get experience proof
async transition get_experience_proof(proof_id: u64) -> Future {
    let f: Future = async {
        Mapping::get(experience_proofs, proof_id);
    };
    return f;
}

// Async function to verify skill proof
async function verify_skill_proof_internal(proof_id: u64, required_level: u32) {
    let proof = Mapping::get(skill_proofs, proof_id);
    proof.skill_level >= required_level;
}

// Verify skill proof
async transition verify_skill_proof(
    proof_id: u64,
    required_level: u32
) -> Future {
    return verify_skill_proof_internal(proof_id, required_level);
}

// Async function to verify experience proof
async function verify_experience_proof_internal(
    proof_id: u64,
    required_jobs: u64,
    required_rate: u32
) {
    let proof = Mapping::get(experience_proofs, proof_id);
    let jobs_ok = proof.min_jobs_completed >= required_jobs;
    let rate_ok = proof.min_delivery_rate >= required_rate;
    jobs_ok && rate_ok;
}

// Verify experience proof
async transition verify_experience_proof(
    proof_id: u64,
    required_jobs: u64,
    required_rate: u32
) -> Future {
    return verify_experience_proof_internal(proof_id, required_jobs, required_rate);
}

}

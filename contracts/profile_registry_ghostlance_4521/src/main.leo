program profile_registry_ghostlance_4521.aleo {

// Profile Registry Contract
// Stores encrypted freelancer data on-chain

// Profile structure
struct Profile {
    profile_owner: address,
    skills: field,  // Encrypted skills data
    experience_years: u32,
    completed_jobs: u64,
    delivery_rate: u32,  // Percentage (0-100)
    encrypted_data: field,  // Additional encrypted profile data
}

// Mapping: address => Profile
mapping profiles: address => Profile;

// Counter for profile IDs (if needed for indexing)
mapping profile_counter: u8 => u64;

@noupgrade
async constructor() {}

// Async function to create profile
async function create_profile_internal(
    owner: address,
    skills: field,
    experience_years: u32,
    completed_jobs: u64,
    delivery_rate: u32,
    encrypted_data: field
) {
    let profile = Profile {
        profile_owner: owner,
        skills: skills,
        experience_years: experience_years,
        completed_jobs: completed_jobs,
        delivery_rate: delivery_rate,
        encrypted_data: encrypted_data,
    };
    
    Mapping::set(profiles, owner, profile);
}

// Create or update a profile
async transition create_profile(
    owner: address,
    skills: field,
    experience_years: u32,
    completed_jobs: u64,
    delivery_rate: u32,
    encrypted_data: field
) -> Future {
    return create_profile_internal(owner, skills, experience_years, completed_jobs, delivery_rate, encrypted_data);
}

// Get profile by address
async transition get_profile(owner: address) -> Future {
    let f: Future = async {
        Mapping::get(profiles, owner);
    };
    return f;
}

// Async function to update skills
async function update_skills_internal(owner: address, new_skills: field) {
    let profile = Mapping::get(profiles, owner);
    let updated_profile = Profile {
        profile_owner: profile.profile_owner,
        skills: new_skills,
        experience_years: profile.experience_years,
        completed_jobs: profile.completed_jobs,
        delivery_rate: profile.delivery_rate,
        encrypted_data: profile.encrypted_data,
    };
    Mapping::set(profiles, owner, updated_profile);
}

// Update skills
async transition update_skills(owner: address, new_skills: field) -> Future {
    return update_skills_internal(owner, new_skills);
}

// Async function to update experience
async function update_experience_internal(owner: address, new_years: u32) {
    let profile = Mapping::get(profiles, owner);
    let updated_profile = Profile {
        profile_owner: profile.profile_owner,
        skills: profile.skills,
        experience_years: new_years,
        completed_jobs: profile.completed_jobs,
        delivery_rate: profile.delivery_rate,
        encrypted_data: profile.encrypted_data,
    };
    Mapping::set(profiles, owner, updated_profile);
}

// Update experience
async transition update_experience(owner: address, new_years: u32) -> Future {
    return update_experience_internal(owner, new_years);
}

// Async function to update completed jobs
async function update_completed_jobs_internal(owner: address, new_count: u64) {
    let profile = Mapping::get(profiles, owner);
    let updated_profile = Profile {
        profile_owner: profile.profile_owner,
        skills: profile.skills,
        experience_years: profile.experience_years,
        completed_jobs: new_count,
        delivery_rate: profile.delivery_rate,
        encrypted_data: profile.encrypted_data,
    };
    Mapping::set(profiles, owner, updated_profile);
}

// Update completed jobs count
async transition update_completed_jobs(owner: address, new_count: u64) -> Future {
    return update_completed_jobs_internal(owner, new_count);
}

// Async function to update delivery rate
async function update_delivery_rate_internal(owner: address, new_rate: u32) {
    let profile = Mapping::get(profiles, owner);
    let updated_profile = Profile {
        profile_owner: profile.profile_owner,
        skills: profile.skills,
        experience_years: profile.experience_years,
        completed_jobs: profile.completed_jobs,
        delivery_rate: new_rate,
        encrypted_data: profile.encrypted_data,
    };
    Mapping::set(profiles, owner, updated_profile);
}

// Update delivery rate
async transition update_delivery_rate(owner: address, new_rate: u32) -> Future {
    return update_delivery_rate_internal(owner, new_rate);
}

}

program proof_generator_ghostlance_7832.aleo;

struct SkillProof:
    freelancer as address;
    skill_name as field;
    skill_level as u32;
    proof_hash as field;

struct ExperienceProof:
    freelancer as address;
    min_jobs_completed as u64;
    min_delivery_rate as u32;
    proof_hash as field;

mapping skill_proofs:
    key as u64.public;
    value as SkillProof.public;

mapping experience_proofs:
    key as u64.public;
    value as ExperienceProof.public;

mapping skill_proof_counter:
    key as u8.public;
    value as u64.public;

mapping experience_proof_counter:
    key as u8.public;
    value as u64.public;

function generate_skill_proof:
    input r0 as address.private;
    input r1 as field.private;
    input r2 as u32.private;
    input r3 as field.private;
    async generate_skill_proof r0 r1 r2 r3 into r4;
    output r4 as proof_generator_ghostlance_7832.aleo/generate_skill_proof.future;

finalize generate_skill_proof:
    input r0 as address.public;
    input r1 as field.public;
    input r2 as u32.public;
    input r3 as field.public;
    get.or_use skill_proof_counter[0u8] 0u64 into r4;
    add r4 1u64 into r5;
    set r5 into skill_proof_counter[0u8];
    cast r0 r1 r2 r3 into r6 as SkillProof;
    set r6 into skill_proofs[r5];

function generate_experience_proof:
    input r0 as address.private;
    input r1 as u64.private;
    input r2 as u32.private;
    input r3 as field.private;
    async generate_experience_proof r0 r1 r2 r3 into r4;
    output r4 as proof_generator_ghostlance_7832.aleo/generate_experience_proof.future;

finalize generate_experience_proof:
    input r0 as address.public;
    input r1 as u64.public;
    input r2 as u32.public;
    input r3 as field.public;
    get.or_use experience_proof_counter[0u8] 0u64 into r4;
    add r4 1u64 into r5;
    set r5 into experience_proof_counter[0u8];
    cast r0 r1 r2 r3 into r6 as ExperienceProof;
    set r6 into experience_proofs[r5];

function get_skill_proof:
    input r0 as u64.private;
    async get_skill_proof r0 into r1;
    output r1 as proof_generator_ghostlance_7832.aleo/get_skill_proof.future;

finalize get_skill_proof:
    input r0 as u64.public;
    get skill_proofs[r0] into r1;

function get_experience_proof:
    input r0 as u64.private;
    async get_experience_proof r0 into r1;
    output r1 as proof_generator_ghostlance_7832.aleo/get_experience_proof.future;

finalize get_experience_proof:
    input r0 as u64.public;
    get experience_proofs[r0] into r1;

function verify_skill_proof:
    input r0 as u64.private;
    input r1 as u32.private;
    async verify_skill_proof r0 into r2;
    output r2 as proof_generator_ghostlance_7832.aleo/verify_skill_proof.future;

finalize verify_skill_proof:
    input r0 as u64.public;
    get skill_proofs[r0] into r1;

function verify_experience_proof:
    input r0 as u64.private;
    input r1 as u64.private;
    input r2 as u32.private;
    async verify_experience_proof r0 into r3;
    output r3 as proof_generator_ghostlance_7832.aleo/verify_experience_proof.future;

finalize verify_experience_proof:
    input r0 as u64.public;
    get experience_proofs[r0] into r1;

constructor:
    assert.eq edition 0u16;

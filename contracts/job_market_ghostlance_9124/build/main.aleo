program job_market_ghostlance_9124.aleo;

struct Job:
    job_id as u64;
    client as address;
    title as field;
    description as field;
    budget as u64;
    deadline as u64;
    required_skill_proofs as field;
    required_experience_proof as u64;
    status as u8;
    created_at as u64;

struct Application:
    application_id as u64;
    job_id as u64;
    freelancer as address;
    bid_amount as u64;
    skill_proofs as field;
    experience_proof as u64;
    proposal as field;
    status as u8;
    created_at as u64;

mapping jobs:
    key as u64.public;
    value as Job.public;

mapping applications:
    key as u64.public;
    value as Application.public;

mapping job_applications:
    key as u64.public;
    value as field.public;

mapping job_counter:
    key as u8.public;
    value as u64.public;

mapping application_counter:
    key as u8.public;
    value as u64.public;

function create_job:
    input r0 as address.private;
    input r1 as field.private;
    input r2 as field.private;
    input r3 as u64.private;
    input r4 as u64.private;
    input r5 as field.private;
    input r6 as u64.private;
    async create_job r0 r1 r2 r3 r4 r5 r6 into r7;
    output r7 as job_market_ghostlance_9124.aleo/create_job.future;

finalize create_job:
    input r0 as address.public;
    input r1 as field.public;
    input r2 as field.public;
    input r3 as u64.public;
    input r4 as u64.public;
    input r5 as field.public;
    input r6 as u64.public;
    get.or_use job_counter[0u8] 0u64 into r7;
    add r7 1u64 into r8;
    set r8 into job_counter[0u8];
    cast r8 r0 r1 r2 r3 r4 r5 r6 0u8 0u64 into r9 as Job;
    set r9 into jobs[r8];

function get_job:
    input r0 as u64.private;
    async get_job r0 into r1;
    output r1 as job_market_ghostlance_9124.aleo/get_job.future;

finalize get_job:
    input r0 as u64.public;
    get jobs[r0] into r1;

function apply_to_job:
    input r0 as u64.private;
    input r1 as address.private;
    input r2 as u64.private;
    input r3 as field.private;
    input r4 as u64.private;
    input r5 as field.private;
    async apply_to_job r0 r1 r2 r3 r4 r5 into r6;
    output r6 as job_market_ghostlance_9124.aleo/apply_to_job.future;

finalize apply_to_job:
    input r0 as u64.public;
    input r1 as address.public;
    input r2 as u64.public;
    input r3 as field.public;
    input r4 as u64.public;
    input r5 as field.public;
    get jobs[r0] into r6;
    is.eq r6.status 0u8 into r7;
    get.or_use application_counter[0u8] 0u64 into r8;
    add r8 1u64 into r9;
    set r9 into application_counter[0u8];
    branch.eq r7 false to end_then_0_0;
    cast r9 r0 r1 r2 r3 r4 r5 0u8 0u64 into r10 as Application;
    set r10 into applications[r9];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;

function get_application:
    input r0 as u64.private;
    async get_application r0 into r1;
    output r1 as job_market_ghostlance_9124.aleo/get_application.future;

finalize get_application:
    input r0 as u64.public;
    get applications[r0] into r1;

function accept_application:
    input r0 as u64.private;
    input r1 as u64.private;
    async accept_application r0 r1 into r2;
    output r2 as job_market_ghostlance_9124.aleo/accept_application.future;

finalize accept_application:
    input r0 as u64.public;
    input r1 as u64.public;
    get jobs[r0] into r2;
    get applications[r1] into r3;
    is.eq r3.job_id r0 into r4;
    is.eq r3.status 0u8 into r5;
    and r4 r5 into r6;
    branch.eq r6 false to end_then_0_2;
    cast r3.application_id r3.job_id r3.freelancer r3.bid_amount r3.skill_proofs r3.experience_proof r3.proposal 1u8 r3.created_at into r7 as Application;
    set r7 into applications[r1];
    cast r2.job_id r2.client r2.title r2.description r2.budget r2.deadline r2.required_skill_proofs r2.required_experience_proof 1u8 r2.created_at into r8 as Job;
    set r8 into jobs[r0];
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;

function close_job:
    input r0 as u64.private;
    async close_job r0 into r1;
    output r1 as job_market_ghostlance_9124.aleo/close_job.future;

finalize close_job:
    input r0 as u64.public;
    get jobs[r0] into r1;
    cast r1.job_id r1.client r1.title r1.description r1.budget r1.deadline r1.required_skill_proofs r1.required_experience_proof 2u8 r1.created_at into r2 as Job;
    set r2 into jobs[r0];

constructor:
    assert.eq edition 0u16;

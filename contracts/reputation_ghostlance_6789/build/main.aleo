program reputation_ghostlance_6789.aleo;

struct Reputation:
    freelancer as address;
    total_jobs_completed as u64;
    on_time_deliveries as u64;
    late_deliveries as u64;
    delivery_rate as u32;
    total_earnings as u64;
    encrypted_feedback as field;

mapping reputations:
    key as address.public;
    value as Reputation.public;

function initialize_reputation:
    input r0 as address.private;
    async initialize_reputation r0 into r1;
    output r1 as reputation_ghostlance_6789.aleo/initialize_reputation.future;

finalize initialize_reputation:
    input r0 as address.public;
    cast r0 0u64 0u64 0u64 100u32 0u64 0field into r1 as Reputation;
    set r1 into reputations[r0];

function get_reputation:
    input r0 as address.private;
    async get_reputation r0 into r1;
    output r1 as reputation_ghostlance_6789.aleo/get_reputation.future;

finalize get_reputation:
    input r0 as address.public;
    cast r0 0u64 0u64 0u64 100u32 0u64 0field into r1 as Reputation;
    get.or_use reputations[r0] r1 into r2;

function update_reputation:
    input r0 as address.private;
    input r1 as boolean.private;
    input r2 as u64.private;
    async update_reputation r0 r1 r2 into r3;
    output r3 as reputation_ghostlance_6789.aleo/update_reputation.future;

finalize update_reputation:
    input r0 as address.public;
    input r1 as boolean.public;
    input r2 as u64.public;
    cast r0 0u64 0u64 0u64 100u32 0u64 0field into r3 as Reputation;
    get.or_use reputations[r0] r3 into r4;
    add r4.total_jobs_completed 1u64 into r5;
    add r4.on_time_deliveries 1u64 into r6;
    ternary r1 r6 r4.on_time_deliveries into r7;
    add r4.late_deliveries 1u64 into r8;
    ternary r1 r4.late_deliveries r8 into r9;
    mul r7 100u64 into r10;
    div r10 r5 into r11;
    cast r11 into r12 as u32;
    add r4.total_earnings r2 into r13;
    cast r4.freelancer r5 r7 r9 r12 r13 r4.encrypted_feedback into r14 as Reputation;
    set r14 into reputations[r0];

function update_feedback:
    input r0 as address.private;
    input r1 as field.private;
    async update_feedback r0 r1 into r2;
    output r2 as reputation_ghostlance_6789.aleo/update_feedback.future;

finalize update_feedback:
    input r0 as address.public;
    input r1 as field.public;
    get reputations[r0] into r2;
    cast r2.freelancer r2.total_jobs_completed r2.on_time_deliveries r2.late_deliveries r2.delivery_rate r2.total_earnings r1 into r3 as Reputation;
    set r3 into reputations[r0];

constructor:
    assert.eq edition 0u16;

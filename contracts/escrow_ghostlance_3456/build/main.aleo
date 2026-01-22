program escrow_ghostlance_3456.aleo;

struct Escrow:
    escrow_id as u64;
    job_id as u64;
    client as address;
    freelancer as address;
    amount as u64;
    status as u8;
    created_at as u64;
    released_at as u64;

mapping escrows:
    key as u64.public;
    value as Escrow.public;

mapping job_escrow:
    key as u64.public;
    value as u64.public;

mapping escrow_counter:
    key as u8.public;
    value as u64.public;

function create_escrow:
    input r0 as u64.private;
    input r1 as address.private;
    input r2 as address.private;
    input r3 as u64.private;
    async create_escrow r0 r1 r2 r3 into r4;
    output r4 as escrow_ghostlance_3456.aleo/create_escrow.future;

finalize create_escrow:
    input r0 as u64.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u64.public;
    get.or_use escrow_counter[0u8] 0u64 into r4;
    add r4 1u64 into r5;
    set r5 into escrow_counter[0u8];
    cast r5 r0 r1 r2 r3 0u8 0u64 0u64 into r6 as Escrow;
    set r6 into escrows[r5];
    set r5 into job_escrow[r0];

function get_escrow:
    input r0 as u64.private;
    async get_escrow r0 into r1;
    output r1 as escrow_ghostlance_3456.aleo/get_escrow.future;

finalize get_escrow:
    input r0 as u64.public;
    get escrows[r0] into r1;

function get_escrow_by_job:
    input r0 as u64.private;
    async get_escrow_by_job r0 into r1;
    output r1 as escrow_ghostlance_3456.aleo/get_escrow_by_job.future;

finalize get_escrow_by_job:
    input r0 as u64.public;
    get job_escrow[r0] into r1;
    get escrows[r1] into r2;

function release_payment:
    input r0 as u64.private;
    async release_payment r0 into r1;
    output r1 as escrow_ghostlance_3456.aleo/release_payment.future;

finalize release_payment:
    input r0 as u64.public;
    get escrows[r0] into r1;
    is.eq r1.status 0u8 into r2;
    branch.eq r2 false to end_then_0_0;
    cast r1.escrow_id r1.job_id r1.client r1.freelancer r1.amount 1u8 r1.created_at 0u64 into r3 as Escrow;
    set r3 into escrows[r0];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;

function dispute_payment:
    input r0 as u64.private;
    async dispute_payment r0 into r1;
    output r1 as escrow_ghostlance_3456.aleo/dispute_payment.future;

finalize dispute_payment:
    input r0 as u64.public;
    get escrows[r0] into r1;
    is.eq r1.status 0u8 into r2;
    branch.eq r2 false to end_then_0_2;
    cast r1.escrow_id r1.job_id r1.client r1.freelancer r1.amount 2u8 r1.created_at r1.released_at into r3 as Escrow;
    set r3 into escrows[r0];
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;

function resolve_dispute_refund:
    input r0 as u64.private;
    async resolve_dispute_refund r0 into r1;
    output r1 as escrow_ghostlance_3456.aleo/resolve_dispute_refund.future;

finalize resolve_dispute_refund:
    input r0 as u64.public;
    get escrows[r0] into r1;
    is.eq r1.status 2u8 into r2;
    branch.eq r2 false to end_then_0_4;
    cast r1.escrow_id r1.job_id r1.client r1.freelancer r1.amount 3u8 r1.created_at r1.released_at into r3 as Escrow;
    set r3 into escrows[r0];
    branch.eq true true to end_otherwise_0_5;
    position end_then_0_4;
    position end_otherwise_0_5;

function resolve_dispute_release:
    input r0 as u64.private;
    async resolve_dispute_release r0 into r1;
    output r1 as escrow_ghostlance_3456.aleo/resolve_dispute_release.future;

finalize resolve_dispute_release:
    input r0 as u64.public;
    get escrows[r0] into r1;
    is.eq r1.status 2u8 into r2;
    branch.eq r2 false to end_then_0_6;
    cast r1.escrow_id r1.job_id r1.client r1.freelancer r1.amount 1u8 r1.created_at 0u64 into r3 as Escrow;
    set r3 into escrows[r0];
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    position end_otherwise_0_7;

constructor:
    assert.eq edition 0u16;

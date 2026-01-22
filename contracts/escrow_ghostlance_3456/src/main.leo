program escrow_ghostlance_3456.aleo {

// Escrow Contract
// Handles payment locking, release, and dispute resolution

// Escrow structure
struct Escrow {
    escrow_id: u64,
    job_id: u64,
    client: address,
    freelancer: address,
    amount: u64,  // Amount in microcredits
    status: u8,  // 0: locked, 1: released, 2: disputed, 3: refunded
    created_at: u64,
    released_at: u64,
}

// Mappings
mapping escrows: u64 => Escrow;
mapping job_escrow: u64 => u64;  // job_id => escrow_id

// Counter
mapping escrow_counter: u8 => u64;

@noupgrade
async constructor() {}

// Async function to create escrow
async function create_escrow_internal(
    job_id: u64,
    client: address,
    freelancer: address,
    amount: u64
) {
    let current_counter = Mapping::get_or_use(escrow_counter, 0u8, 0u64);
    let escrow_id: u64 = current_counter + 1u64;
    Mapping::set(escrow_counter, 0u8, escrow_id);
    
    let escrow = Escrow {
        escrow_id: escrow_id,
        job_id: job_id,
        client: client,
        freelancer: freelancer,
        amount: amount,
        status: 0u8,  // locked
        created_at: 0u64,  // Will be set by frontend
        released_at: 0u64,
    };
    
    Mapping::set(escrows, escrow_id, escrow);
    Mapping::set(job_escrow, job_id, escrow_id);
}

// Create escrow (lock funds)
async transition create_escrow(
    job_id: u64,
    client: address,
    freelancer: address,
    amount: u64
) -> Future {
    return create_escrow_internal(job_id, client, freelancer, amount);
}

// Get escrow details
async transition get_escrow(escrow_id: u64) -> Future {
    let f: Future = async {
        Mapping::get(escrows, escrow_id);
    };
    return f;
}

// Get escrow by job ID
async transition get_escrow_by_job(job_id: u64) -> Future {
    let f: Future = async {
        let escrow_id = Mapping::get(job_escrow, job_id);
        Mapping::get(escrows, escrow_id);
    };
    return f;
}

// Async function to release payment
async function release_payment_internal(escrow_id: u64) {
    let escrow = Mapping::get(escrows, escrow_id);
    let escrow_status = escrow.status;
    let is_locked = escrow_status == 0u8;
    
    if is_locked {
        let updated_escrow = Escrow {
            escrow_id: escrow.escrow_id,
            job_id: escrow.job_id,
            client: escrow.client,
            freelancer: escrow.freelancer,
            amount: escrow.amount,
            status: 1u8,  // released
            created_at: escrow.created_at,
            released_at: 0u64,  // Will be set by frontend
        };
        
        Mapping::set(escrows, escrow_id, updated_escrow);
    }
}

// Release payment (client approves work)
async transition release_payment(escrow_id: u64) -> Future {
    return release_payment_internal(escrow_id);
}

// Async function to dispute payment
async function dispute_payment_internal(escrow_id: u64) {
    let escrow = Mapping::get(escrows, escrow_id);
    let escrow_status = escrow.status;
    let is_locked = escrow_status == 0u8;
    
    if is_locked {
        let updated_escrow = Escrow {
            escrow_id: escrow.escrow_id,
            job_id: escrow.job_id,
            client: escrow.client,
            freelancer: escrow.freelancer,
            amount: escrow.amount,
            status: 2u8,  // disputed
            created_at: escrow.created_at,
            released_at: escrow.released_at,
        };
        
        Mapping::set(escrows, escrow_id, updated_escrow);
    }
}

// Dispute payment
async transition dispute_payment(escrow_id: u64) -> Future {
    return dispute_payment_internal(escrow_id);
}

// Async function to resolve dispute refund
async function resolve_dispute_refund_internal(escrow_id: u64) {
    let escrow = Mapping::get(escrows, escrow_id);
    let escrow_status = escrow.status;
    let is_disputed = escrow_status == 2u8;
    
    if is_disputed {
        let updated_escrow = Escrow {
            escrow_id: escrow.escrow_id,
            job_id: escrow.job_id,
            client: escrow.client,
            freelancer: escrow.freelancer,
            amount: escrow.amount,
            status: 3u8,  // refunded
            created_at: escrow.created_at,
            released_at: escrow.released_at,
        };
        
        Mapping::set(escrows, escrow_id, updated_escrow);
    }
}

// Resolve dispute (refund to client)
async transition resolve_dispute_refund(escrow_id: u64) -> Future {
    return resolve_dispute_refund_internal(escrow_id);
}

// Async function to resolve dispute release
async function resolve_dispute_rel_internal(escrow_id: u64) {
    let escrow = Mapping::get(escrows, escrow_id);
    let escrow_status = escrow.status;
    let is_disputed = escrow_status == 2u8;
    
    if is_disputed {
        let updated_escrow = Escrow {
            escrow_id: escrow.escrow_id,
            job_id: escrow.job_id,
            client: escrow.client,
            freelancer: escrow.freelancer,
            amount: escrow.amount,
            status: 1u8,  // released
            created_at: escrow.created_at,
            released_at: 0u64,  // Will be set by frontend
        };
        
        Mapping::set(escrows, escrow_id, updated_escrow);
    }
}

// Resolve dispute (release to freelancer)
async transition resolve_dispute_release(escrow_id: u64) -> Future {
    return resolve_dispute_rel_internal(escrow_id);
}

}

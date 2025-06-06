'use server'
 
export interface Candidate {
    firstName: string
    lastName: string
    interviewRefNo: string
    major: string
}

export interface CandidatesResponse {
    design: Candidate[],
    content: Candidate[],
    programming: Candidate[],
    marketing: Candidate[]
}

export async function checkCandidate(firstname: string, lastname: string, major: string) {
    const res = await fetch("https://api.ywc20.ywc.in.th/homework/candidates", {
        headers: {
            "x-reference-id": "PG-39"
        }
    })
    const data: CandidatesResponse = await res.json();
    if (major == "design") {
        const candidate = data.design.find(candidate => candidate.firstName.toLowerCase() == firstname.toLowerCase() && candidate.lastName.toLowerCase() == lastname.toLowerCase());
        if (candidate) return candidate;
        return null;
    }
    else if (major == "programming") {
        const candidate = data.programming.find(candidate => candidate.firstName.toLowerCase() == firstname.toLowerCase() && candidate.lastName.toLowerCase() == lastname.toLowerCase());
        if (candidate) return candidate;
        return null;
    }
    else if (major == "content") {
        const candidate = data.content.find(candidate => candidate.firstName.toLowerCase() == firstname.toLowerCase() && candidate.lastName.toLowerCase() == lastname.toLowerCase());
        if (candidate) return candidate;
        return null;
    }
    else if (major == "marketing") {
        const candidate = data.marketing.find(candidate => candidate.firstName.toLowerCase() == firstname.toLowerCase() && candidate.lastName.toLowerCase() == lastname.toLowerCase());
        if (candidate) return candidate;
        return null;
    }
    return null;
}
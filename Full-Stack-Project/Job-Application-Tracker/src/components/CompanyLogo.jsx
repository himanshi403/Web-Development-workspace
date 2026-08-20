import { useEffect, useState } from "react";

function CompanyLogo({ company, size = "normal" }) {

    const [logoUrl, setLogoUrl] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [imageError, setImageError] =
        useState(false);


    const getInitials = (name) => {

        if (!name) {
            return "C";
        }

        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(word =>
                word.charAt(0).toUpperCase()
            )
            .join("");

    };


    useEffect(() => {

        const fetchCompanyLogo = async () => {

            if (!company?.trim()) {

                setLoading(false);

                return;

            }

            try {

                setLoading(true);

                setImageError(false);

                setLogoUrl("");


                const response = await fetch(

                    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(
                        company.trim()
                    )}`

                );


                if (!response.ok) {

                    throw new Error(
                        "Company lookup failed"
                    );

                }


                const companies =
                    await response.json();


                if (
                    !companies ||
                    companies.length === 0
                ) {

                    setLoading(false);

                    return;

                }


                /*
                    Prefer an exact company-name match.
                    Otherwise use the first result.
                */

                const normalizedCompany =
                    company
                        .trim()
                        .toLowerCase();


                const exactMatch =
                    companies.find(

                        item =>
                            item.name
                                ?.trim()
                                .toLowerCase() ===
                            normalizedCompany

                    );


                const matchedCompany =
                    exactMatch || companies[0];


                if (matchedCompany?.domain) {

                    /*
                        Google favicon service uses
                        the real company domain.

                        Example:
                        google.com
                        → Google's favicon/logo
                    */

                    setLogoUrl(

                        `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
                            matchedCompany.domain
                        )}&sz=128`

                    );

                }

            } catch (error) {

                console.error(

                    "Unable to fetch company logo:",

                    error

                );

            } finally {

                setLoading(false);

            }

        };


        fetchCompanyLogo();

    }, [company]);


    return (

        <div
            className={`company-logo company-logo-${size}`}
        >

            {

                !loading &&

                logoUrl &&

                !imageError

                    ? (

                        <img
                            src={logoUrl}
                            alt={`${company} logo`}

                            onError={() =>
                                setImageError(true)
                            }
                        />

                    )

                    : (

                        <span>

                            {getInitials(company)}

                        </span>

                    )

            }

        </div>

    );

}

export default CompanyLogo;
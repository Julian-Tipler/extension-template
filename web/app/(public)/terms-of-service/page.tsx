import { BRAND_NAME } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Our terms of service outline the rules and guidelines for using our services and your rights and responsibilities as a user.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfService() {
  return (
    <div className="p-4 mx-auto max-w-5xl lg:p-16">
      <div>
        <div
          className="tab-content translations-content-item en visible flex flex-col gap-6"
          id="en"
        >
          <h1 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white">
            {BRAND_NAME} Terms of Service
          </h1>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Last updated: October 2, 2024
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            These Terms of Service (the “Agreement”) outline the conditions for
            accessing and using the services provided by {BRAND_NAME} LLC
            (“Company”). By (A) purchasing access through an online ordering
            process that references this Agreement, (B) registering for a free
            or paid plan via any platform that refers to this Agreement, or (C)
            selecting an option indicating your acceptance, you agree to be
            bound by these terms. The person accepting this Agreement represents
            an organization or legal entity (“Customer”); such person guarantees
            they have the authority to bind that entity and its affiliates to
            this Agreement. If the person lacks such authority, or the entity
            disagrees with these terms, they must not accept this Agreement or
            use the services. All capitalized terms herein hold the meanings
            defined below. The parties agree as follows
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            1. The Service
          </h2>
          <h3 className="text-2xl font-bold dark:text-white">
            1.1 Service Overview
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {BRAND_NAME} LLC provides a cloud-based service enabling the
            creation and management of AI-driven chatbots for various purposes,
            such as customer support and user interaction (the “Service”).
            Anything submitted, configured, or uploaded by the Customer (or
            Users) through the Service is deemed a “User Submission.” The
            Customer is fully responsible for all User Submissions. Additional
            terms related to User Submissions, including ownership, are covered
            in Section 8.2. The Service may also include templates, scripts, and
            other materials to aid Customer use (“Company Content”). The
            Customer will not have access to the underlying software or code of
            the Service.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            1.2 Customer&apos;s Subscription
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Subject to this Agreement, the Customer can purchase a subscription
            to access and use the Service, as specified in the ordering process
            through {BRAND_NAME} LLC&apos;s website or portal referencing this
            Agreement. All subscriptions cover the period outlined in the
            applicable order (“Subscription Period”). Use of the Service is
            restricted to authorized Users for internal business purposes only.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            1.3 Company Ownership
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {BRAND_NAME} LLC retains full ownership of the Service, Software,
            Company Content, and all other materials provided (collectively,
            “Company Materials”). All related intellectual property rights are
            reserved. The Customer is granted no implied licenses, and any
            rights not explicitly outlined in this Agreement are reserved.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            2. Restrictions
          </h2>
          <h3 className="text-2xl font-bold dark:text-white">
            2.1 Customer Responsibilities
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            The Customer is fully responsible for all actions taken under its
            account, including those of its Users, except in cases where such
            actions result from unauthorized access caused by vulnerabilities in
            the Service. The Customer must ensure that all Users are informed of
            and comply with the obligations and restrictions outlined in this
            Agreement and is liable for any breaches by Users.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            2.2 Usage Restrictions
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            The Customer agrees not to, and will not permit Users or any third
            party to, directly or indirectly: (a) modify, copy, or create
            derivative works based on the Service; (b) reverse engineer,
            decompile, or attempt to access the source code or underlying ideas
            of the Service, unless expressly allowed by law; (c) sublicense,
            sell, rent, lease, or otherwise commercially exploit the Service;
            (d) remove any proprietary notices from the Service; (e) use the
            Service in violation of applicable laws or regulations; (f) attempt
            unauthorized access to, or disrupt, the Service; (g) use the Service
            in a manner that supports products competing with {BRAND_NAME} LLC;
            (h) conduct vulnerability testing of the Service without prior
            authorization. If the Customer&apos;s use of the Service threatens
            the security or integrity of {BRAND_NAME} LLC or the Service itself,
            {BRAND_NAME} LLC reserves the right to suspend access, with
            reasonable efforts to notify the Customer and promptly resolve the
            issue.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            3. Financial Terms
          </h2>
          <h3 className="text-2xl font-bold dark:text-white">3.1 Fees</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Customers must pay for access to and use of the Service as specified
            in the applicable order (“Fees”). All Fees will be charged in the
            currency indicated in the order, or if no currency is specified, in
            U.S. dollars. Payment obligations are non-cancellable and, except as
            expressly stated in this Agreement, Fees are non-refundable.
            {BRAND_NAME} LLC reserves the right to change its Fees or introduce
            new fees at its discretion. Customers may choose not to renew their
            subscription if they disagree with any adjusted fees.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">3.2 Payment</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {BRAND_NAME} LLC, either directly or through a third-party payment
            processor (“Payment Processor”), will bill the Customer for the Fees
            using the credit card or ACH payment information provided.{" "}
            {BRAND_NAME}
            LLC reserves the right to charge the Customer&apos;s credit card or
            ACH payment method for any services rendered under the order,
            including recurring Fees. It is the Customer&apos;s responsibility
            to ensure that {BRAND_NAME} LLC has up-to-date and accurate payment
            information. Failure to provide correct information may result in a
            suspension of access to the Services. {BRAND_NAME} LLC also retains
            the right to offset any Fees owed by the Customer. If payments are
            processed through a Payment Processor, such transactions are subject
            to the Payment Processor&apos;s terms and policies, in addition to
            this Agreement. {BRAND_NAME} LLC is not liable for any errors or
            omissions made by the Payment Processor and reserves the right to
            correct any such errors, even if payment has already been requested
            or received. If the Customer authorizes recurring charges upon
            accepting an order, those charges will be automatically applied to
            the Customer&apos;s payment method without further authorization
            until the Customer terminates this Agreement or updates their
            payment information.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">3.3 Taxes</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Fees do not include any taxes, levies, duties, or similar
            governmental assessments, such as value-added, sales, use, or
            withholding taxes, imposed by any jurisdiction (collectively,
            “Taxes”). Customers are responsible for all Taxes related to their
            purchases. If {BRAND_NAME} LLC is required to pay or collect Taxes
            for which the Customer is liable, {BRAND_NAME} LLC will invoice the
            Customer for such Taxes unless the Customer provides a valid tax
            exemption certificate from the appropriate taxing authority in
            advance. For clarity, {BRAND_NAME} LLC is solely responsible for
            taxes based on its income, property, and employees.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            3.4 Failure to Pay
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            If a Customer fails to pay any Fees when due, {BRAND_NAME} LLC may
            suspend access to the Service until the overdue amounts are settled.
            {BRAND_NAME} LLC is authorized to attempt charging the
            Customer&apos;s payment method multiple times if an initial charge
            is unsuccessful. If a Customer believes they have been billed
            incorrectly, they must notify {BRAND_NAME} LLC within sixty (60)
            days from the first billing statement showing the discrepancy to
            request an adjustment or credit. Upon receiving a dispute notice,{" "}
            {BRAND_NAME} LLC will review the issue and provide a written
            decision to the Customer, along with evidence supporting this
            decision. If it is determined that the billed amounts are due, the
            Customer must pay these amounts within ten (10) days of receiving{" "}
            {BRAND_NAME} LLC&apos;s written decision.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            4. Term and Termination
          </h2>
          <h3 className="text-2xl font-bold dark:text-white">
            4.1 Agreement Term and Renewals
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Subscriptions to access and utilize {BRAND_NAME} LLC&apos;s service
            (“Service”) begin on the start date specified in the applicable
            order (“Subscription Start Date”) and continue for the duration
            defined in the Subscription Period. Customers may choose not to
            renew their Subscription Period by notifying {BRAND_NAME} LLC at
            support@{BRAND_NAME}.coiom (subject to written confirmation of
            cancellation) or by adjusting their subscription through their
            account settings within the Service. This Agreement becomes
            effective on the first day of the Subscription Period and remains in
            effect for the entire duration of the Subscription Period stated in
            the order, including any renewals and any time the Customer uses the
            Service, even if not under a paid order (“Term”). If this Agreement
            is terminated by either party, it will automatically terminate all
            associated orders. If a Customer cancels or declines to renew their
            paid subscription, access will continue but will automatically
            transition to a version of the Service with limited features and
            functionality that {BRAND_NAME} LLC offers to unpaid subscribers
            (“Free Version”). If this Agreement is terminated by either party,
            or if the Customer deletes its workspace within the Service, access
            to the Free Version will also be revoked.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            4.2 Termination
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Either party may terminate this Agreement by providing written
            notice to the other party if the other party materially breaches
            this Agreement and fails to rectify such breach within thirty (30)
            days after receiving the notice. {BRAND_NAME} LLC may terminate a
            Customer&apos;s access to the Free Version at any time with notice.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            4.3 Effect of Termination
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            If the Customer terminates this Agreement due to a breach by
            {BRAND_NAME} LLC that remains uncured, {BRAND_NAME} LLC will refund
            any unused, prepaid Fees for the remainder of the current
            Subscription Period. Conversely, if {BRAND_NAME} LLC terminates this
            Agreement due to a breach by the Customer that remains uncured, the
            Customer must pay any unpaid Fees covering the remainder of the
            current Subscription Period post-termination. Termination does not
            relieve the Customer from the obligation to pay any Fees due to{" "}
            {BRAND_NAME}
            LLC for the period preceding the effective date of termination. Upon
            termination, all rights and licenses granted by {BRAND_NAME} LLC
            will cease immediately, and the Customer will lose access to the
            Service. Within thirty (30) days of termination for cause, at the
            Customer&apos;s request, or if the Customer deletes its workspace,
            {BRAND_NAME} LLC will delete the Customer&apos;s User Information,
            including passwords, files, and submissions, unless an earlier
            deletion is requested in writing. For Customers using the Free
            Version, {BRAND_NAME} LLC may retain User Submissions and User
            Information to facilitate ongoing use. {BRAND_NAME} LLC may delete
            all User Submissions and User Information if the account remains
            inactive for more than one (1) year.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">4.4 Survival</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Sections titled “Ownership,” “Third-Party Services,” “Financial
            Terms,” “Term and Termination,” “Warranty Disclaimer,” “Limitation
            of Liability,” “Confidentiality,” “Data,” and “General Terms” will
            remain in effect following any termination or expiration of this
            Agreement.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            5. Warranties and Disclaimers
          </h2>
          <h3 className="text-2xl font-bold dark:text-white">5.1 Warranties</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Customers represent and warrant that all User Submissions made by
            Users adhere to all applicable laws, regulations, and rules.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            5.2 Warranty Disclaimer
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            EXCEPT AS SPECIFICALLY STATED HEREIN, THE SERVICES AND ALL
            ASSOCIATED COMPONENTS AND INFORMATION ARE PROVIDED ON AN &quot;AS
            IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES
            OF ANY KIND. {BRAND_NAME} LLC EXPRESSLY DISCLAIMS ALL WARRANTIES,
            WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT. CUSTOMERS ACKNOWLEDGE THAT {BRAND_NAME} LLC DOES
            NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE,
            OR FREE FROM ERRORS. SOME JURISDICTIONS DO NOT ALLOW THE
            DISALLOWANCE OF CERTAIN WARRANTIES, SO THE ABOVE DISCLAIMERS MAY NOT
            APPLY WHERE PROHIBITED BY LAW.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            NOTWITHSTANDING ANY CONTRARY PROVISION, {BRAND_NAME} LLC WILL NOT BE
            LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL
            DAMAGES, INCLUDING DAMAGES RELATED TO THE USE OR ACCESS,
            INTERRUPTION, DELAY, OR INABILITY TO USE THE SERVICE, LOST REVENUES
            OR PROFITS, LOSS OF BUSINESS OR GOODWILL, DATA CORRUPTION, OR SYSTEM
            FAILURES, REGARDLESS OF THE LEGAL THEORY. FURTHERMORE, {BRAND_NAME}
            LLC&apos;S TOTAL LIABILITY WILL NOT EXCEED THE TOTAL FEES PAID OR
            PAYABLE BY THE CUSTOMER FOR THE SERVICE DURING THE TWELVE (12)
            MONTHS PRECEDING THE CLAIM. THESE LIMITATIONS APPLY REGARDLESS OF
            WHETHER {BRAND_NAME} LLC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
            DAMAGES.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            7. Confidentiality
          </h2>
          <h3 className="text-2xl font-bold dark:text-white">7.1 Definition</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Each party (the “Receiving Party”) acknowledges that the other party
            (the “Disclosing Party”) may disclose business, technical, or
            financial information related to the Disclosing Party&apos;s
            operations that is reasonably regarded as confidential due to its
            nature and the context of its disclosure (“Confidential
            Information”). For {BRAND_NAME} LLC, Confidential Information
            includes non-public information regarding the features,
            functionality, and performance of the Service. For Customers,
            Confidential Information consists of User Information and User
            Submissions. This Agreement, along with all associated Orders, is
            also classified as Confidential Information for both parties.
            Confidential Information does not include information that: (a)
            becomes publicly known without violating any duty to the Disclosing
            Party; (b) was already known to the Receiving Party prior to
            disclosure by the Disclosing Party without violating any duty; (c)
            is obtained from a third party without violating any duty; or (d)
            was developed independently by the Receiving Party without utilizing
            the Disclosing Party&apos;s Confidential Information.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            7.2 Protection and Use of Confidential Information
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            The Receiving Party agrees to: (a) safeguard the Disclosing Party’s
            Confidential Information with at least the same level of care it
            employs for its own similar information, but not less than a
            reasonable level of care; (b) limit access to Confidential
            Information to its personnel, affiliates, subcontractors, agents,
            consultants, legal and financial advisors, and contractors
            (“Representatives”) who require this information for purposes
            related to this Agreement and who are bound by confidentiality
            obligations comparable to those in this Agreement; (c) refrain from
            disclosing any Confidential Information to third parties without
            prior written consent from the Disclosing Party, except as
            explicitly stated herein; and (d) utilize the Confidential
            Information solely to meet obligations under this Agreement. This
            provision does not restrict sharing of Agreement terms or the other
            party&apos;s name with potential investors or buyers under standard
            confidentiality terms.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            7.3 Compelled Access or Disclosure
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            If required by law, the Receiving Party may access or disclose the
            Disclosing Party&apos;s Confidential Information, provided that it
            informs the Disclosing Party in advance (where legally permissible)
            and offers reasonable assistance, at the Disclosing Party&apos;s
            expense, if the Disclosing Party wishes to contest the disclosure.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">7.4 Feedback</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Customers may occasionally provide feedback regarding the Service
            (“Feedback”). {BRAND_NAME} LLC may decide to incorporate this
            Feedback into its services. Customers grant {BRAND_NAME} LLC a
            royalty-free, global, perpetual, irrevocable, fully transferable,
            and sublicensable license to use, disclose, modify, create
            derivative works from, distribute, display, and otherwise utilize
            any Feedback as {BRAND_NAME} LLC sees fit, without any obligations
            or restrictions, except for the requirement not to identify the
            Customer as the source of the Feedback.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">8. Data</h2>
          <h3 className="text-2xl font-bold dark:text-white">
            8.1 User Information
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Customers and their Users are required to provide information such
            as names, email addresses, usernames, IP addresses, browsers, and
            operating systems (“User Information”) to access the Service.
            Customers authorize {BRAND_NAME} LLC and its subcontractors to
            store, process, and retrieve User Information as part of their use
            of the Service. Customers confirm that they possess the necessary
            rights to provide User Information to {BRAND_NAME} LLC for the
            purposes outlined in this Agreement. Customers are responsible for
            their User Information and for any unauthorized use of their
            credentials.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            8.2 User Submissions
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Customers grant {BRAND_NAME} LLC a non-exclusive, worldwide,
            royalty-free, transferable license to use, process, and display User
            Submissions solely for the purpose of delivering the Service. Except
            for the rights explicitly granted herein, Customers retain all
            rights to their User Submissions, with no implied licenses created
            under this Agreement.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            8.3 Service Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {BRAND_NAME} LLC collects data regarding the performance and
            operation of the Service (“Service Data”) as Customers utilize the
            Service. As long as the Service Data is aggregated and anonymized,
            ensuring that no personal information is disclosed, {BRAND_NAME} LLC
            may use this data without restriction. {BRAND_NAME} LLC holds all
            rights to the Service Data but will not identify Customers or Users
            as its source.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            9. General Terms
          </h2>
          <h3 className="text-2xl font-bold dark:text-white">9.1 Publicity</h3>
          <p className="text-gray-600 dark:text-gray-400">
            With prior written consent from the Customer, {BRAND_NAME} LLC may
            identify the Customer and use their name, logo, trademarks, or
            service marks on {BRAND_NAME} LLC&apos;s website and marketing
            materials. This allows {BRAND_NAME} LLC to showcase its clientele
            and user base while respecting the Customer&apos;s confidentiality
            and privacy rights.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.2 Force Majeure
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {BRAND_NAME} LLC will not be held liable for any failure or delay in
            fulfilling its obligations under this Agreement due to events beyond
            its reasonable control, including but not limited to third-party
            hosting or utility provider failures, strikes (not involving
            {BRAND_NAME} LLC&apos;s employees), riots, fires, natural disasters,
            wars, terrorism, or government actions. These circumstances provide
            {BRAND_NAME} LLC with protection against unforeseen events that
            hinder service delivery.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">9.3 Changes</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {BRAND_NAME} LLC recognizes that its service is a
            subscription-based, evolving product. To improve customer
            experience, {BRAND_NAME} LLC reserves the right to make changes to
            the Service. However,
            {BRAND_NAME} LLC commits not to materially reduce the core
            functionality provided to Customers. Additionally, {BRAND_NAME} LLC
            may unilaterally modify the terms of this Agreement, provided
            Customers receive at least thirty (30) days&apos; notice prior to
            such changes, with updates prominently posted (e.g., on the{" "}
            {BRAND_NAME} LLC website terms page).
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.4 Relationship of the Parties
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This Agreement does not establish a partnership, franchise, joint
            venture, agency, fiduciary, or employment relationship between
            {BRAND_NAME} LLC and the Customer. Both parties act as independent
            contractors, each managing their respective operations while
            cooperating under this Agreement&apos;s terms.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.5 No Third-Party Beneficiaries
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This Agreement is solely between {BRAND_NAME} LLC and the Customer
            and is not intended to benefit any third party. No third party shall
            have the right to enforce any of its terms, either directly or
            indirectly, clarifying that obligations and benefits are limited to
            the parties involved.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.6 Email Communications
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Notices related to this Agreement will be communicated via email,
            although {BRAND_NAME} LLC may opt to deliver notices through the
            Service. Notices to {BRAND_NAME} LLC should be directed to a
            specified
            {BRAND_NAME} LLC email, while notices to Customers will be sent to
            the email addresses they provided through the Service. Notices are
            deemed delivered the next business day after emailing or on the same
            day if provided through the Service.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.7 Amendment and Waivers
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            No changes to this Agreement will be effective unless made in
            writing and signed or acknowledged by authorized representatives of
            both parties. A delay or failure to exercise any right under this
            Agreement does not constitute a waiver of that right. Waivers must
            be in writing and signed by the party granting the waiver.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.8 Severability
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            If any provision of this Agreement is deemed unlawful or
            unenforceable by a court, it will be modified to the minimum extent
            necessary to render it lawful or enforceable, while the remaining
            provisions will remain in full effect. This ensures the Agreement
            continues to operate even if parts of it are altered or removed.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">9.9 Assignment</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Neither party may assign or delegate their rights or obligations
            under this Agreement without the prior written consent of the other
            party, except that {BRAND_NAME} LLC may assign its rights without
            consent in cases of mergers, acquisitions, corporate
            reorganizations, or sales of substantially all assets. Any
            unauthorized assignment will be void. This Agreement binds and
            benefits the parties, their successors, and permitted assigns.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.10 Governing Law and Venue
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This Agreement will be governed by the laws of the State of Texas,
            USA, excluding its conflict of laws principles. Disputes arising
            under this Agreement will be resolved in the state or federal courts
            in Texas, to which both parties consent to jurisdiction and venue.
            There is a waiver of any right to a jury trial for disputes arising
            under this Agreement. The prevailing party in any enforcement action
            is entitled to recover its reasonable costs and attorney fees.
          </p>
          <h3 className="text-2xl font-bold dark:text-white">
            9.11 Entire Agreement
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            This Agreement, including any referenced documents and Orders,
            constitutes the complete agreement between {BRAND_NAME} LLC and the
            Customer, superseding all prior discussions, agreements, and
            understandings of any kind. This ensures clarity and
            comprehensiveness regarding the mutual expectations and obligations
            of the parties.
          </p>
          <h2 className="text-3xl font-extrabold dark:text-white">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            If you have any questions about this Privacy Policy, You can contact
            us:
          </p>
          <ul className="max-w-2xl space-y-4 text-gray-700 list-disc list-oustide dark:text-gray-400">
            <li>By email: support@wisepilot.io</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

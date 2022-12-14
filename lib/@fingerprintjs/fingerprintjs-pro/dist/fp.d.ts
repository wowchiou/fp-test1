/**
 * FingerprintJS Pro v3.5.1 - Copyright (c) FingerprintJS, Inc, 2021 (https://fingerprintjs.com)
 *
 * This software contains code from open-source projects:
 * MurmurHash3 by Karan Lyons (https://github.com/karanlyons/murmurHash3.js)
 */

import { LoadOptions } from '@fingerprintjs/fingerprintjs';

interface Confidence {
    /**
     * A number between 0 and 1 that tells how much the agent is sure about the visitor identifier.
     * The higher the number, the higher the chance of the visitor identifier to be true.
     */
    score: number;
    /**
     * Additional details about the score as a human-readable text
     */
    comment?: string;
}
/**
 * IP address location. Can be empty for anonymous proxies.
 */
interface IpLocation {
    /**
     * IP address location detection radius. Smaller values (<50mi) are business/residential,
     * medium values (50 < x < 500) are cellular towers (usually),
     * larger values (>= 500) are cloud IPs or proxies, VPNs.
     * Can be missing, in case of Tor/proxies.
     */
    accuracyRadius?: number;
    /**
     * Latitude
     * Can be missing, in case of Tor/proxies.
     * @example
     * -19.8975
     */
    latitude?: number;
    /**
     * Longitude
     * Can be missing, in case of Tor/proxies.
     * @example
     * -43.9625
     */
    longitude?: number;
    /**
     * Timezone of the IP address location
     * @example
     * 'America/Chicago'
     */
    timezone?: string;
    /**
     * Postal code, when available
     */
    postalCode?: string;
    /**
     * City, when available
     */
    city?: {
        name: string;
    };
    /**
     * Administrative subdivisions array (for example states|provinces -> counties|parishes).
     * Can be empty or missing.
     * When not empty, can contain only top-level administrative units within a country, e.g. a state.
     */
    subdivisions?: [
        {
            isoCode: string;
            name: string;
        }
    ];
    /**
     * Country, when available. Will be missing for Tor/anonymous proxies.
     */
    country?: {
        code: string;
        name: string;
    };
    /**
     * Continent, when available. Will be missing for Tor/anonymous proxies.
     */
    continent?: {
        code: string;
        name: string;
    };
}
/**
 * IP address location when used with "full" IP resolution. Can be empty for anonymous proxies.
 */
interface FullIpLocation extends IpLocation {
    /**
     * Organization, when available. Will be missing for Tor/anonymous proxies.
     */
    organization?: {
        name: string;
        domain: string;
        isp: string;
        legalName: string;
    };
}
interface BotInformation {
    /**
     * @deprecated Agent doesn't detect bots
     */
    probability: number;
    /**
     * @deprecated Agent doesn't detect bots
     */
    safe?: boolean;
}
/**
 * Result of requesting a visitor id
 */
interface VisitorId {
    /**
     * The visitor identifier
     */
    visitorId: string;
    /**
     * If true, this visitor was found and visited before.
     * If false, this visitor wasn't found and probably didn't visit before.
     */
    visitorFound: boolean;
    /**
     * A confidence score that tells how much the agent is sure about the visitor identifier
     */
    confidence?: Confidence;
}
/**
 * Result of requesting a visitor id when requested with `extendedData: true`
 */
interface ExtendedVisitorId extends VisitorId {
    /**
     * Whether the visitor is in incognito/private mode
     */
    incognito: boolean;
    /**
     * Browser name
     * @example
     * 'Safari'
     * @example
     * 'Chrome'
     */
    browserName: string;
    /**
     * Browser version
     * @example
     * '78.0.3904'
     */
    browserVersion: string;
    /**
     * Device.
     * For desktop/laptop devices, the value will be "Other"
     * @example
     * 'Samsung SM-J330F'
     */
    device: string;
    /**
     * IP address. Only IPv4 are returned.
     * @example
     * '191.14.35.17'
     */
    ip: string;
    /**
     * IP address location. Can be empty for anonymous proxies
     */
    ipLocation: IpLocation;
    /**
     * OS name.
     * @example
     * 'Mac OS X'
     * @example
     * 'Windows'
     * @example
     * 'Android'
     */
    os: string;
    /**
     * OS version
     * @example
     * '10.13.6'
     */
    osVersion: string;
    /**
     * @deprecated Agent doesn't detect bots
     */
    bot?: BotInformation;
}
/**
 * Result of requesting a visitor id when requested with `extendedData: true` and `ipResolution: 'full'`
 */
interface FullIpExtendedVisitorId extends ExtendedVisitorId {
    /**
     * @inheritDoc
     */
    ipLocation: FullIpLocation;
}
/**
 * Possible reasons for APIv1 backend to return 'n/a'
 */
declare const enum V1NotAvailableVisitorIdReason {
    TokenMissing = "Token required",
    TokenNotFound = "Token not found",
    TokenExpired = "Token expired",
    BadRequestFormat = "Request cannot be parsed",
    GeneralServerFailure = "Request failed",
    ServerTimeout = "Request failed to process",
    RateLimit = "Too many requests, rate limit exceeded",
    ForbiddenOrigin = "Not available for this origin",
    ForbiddenHeader = "Not available with restricted header",
    CrawlBot = "Not available for crawl bots",
    MissingUserAgent = "Not available when User-Agent is unspecified"
}

interface ResultExtraFields {
    /**
     * The current request identifier. It's different for every request.
     */
    requestId: string;
    /**
     * A confidence score that tells how much the agent is sure about the visitor identifier
     */
    confidence: Confidence;
}
/**
 * Result of getting a visitor id.
 *
 * visitorId can be empty string when the visitor can't be identified.
 * It happens only with bots and hackers that modify their browsers.
 */
declare type GetResult = VisitorId & ResultExtraFields;
/**
 * Result of getting a visitor id when requested with `extendedData: true`
 */
declare type ExtendedGetResult = ExtendedVisitorId & ResultExtraFields;
/**
 * Result of getting a visitor id when requested with `extendedData: true` and `ipResolution: 'full'`
 */
declare type FullIpExtendedGetResult = FullIpExtendedVisitorId & ResultExtraFields;

declare const ERROR_WRONG_REGION: string;
declare const ERROR_SUBSCRIPTION_NOT_ACTIVE: string;

/**
 * Handles a debug event
 */
declare type PublicDebugOutput = (event: {
    e: number;
}) => void;

/**
 * Makes a debug output that passes debug events to multiple debug outputs.
 *
 * Warning for package users:
 * This function is an experimental API, it can change unexpectedly. Usage is at your own risk.
 */
declare function makeMulticastDebugger<T extends unknown[]>(outputs: readonly (((...args: T) => void) | null | false | undefined)[]): (...args: T) => void;

/**
 * Makes a debug output that prints debug messages to browser console.
 *
 * Warning for package users:
 * This function is an experimental API, it can change unexpectedly. Usage is at your own risk.
 */
declare const makePublicConsoleDebugger: (messagePrefix?: string | undefined) => PublicDebugOutput;

declare const makePublicDebugReportBuilder: (handleReport: (report: unknown) => void) => PublicDebugOutput;

interface RollbarOptions {
    clientId: string;
    token: string;
    endpoint?: string;
}
/**
 * Makes a debug output that groups debug messages into reports and sends them to Rollbar.
 *
 * Warning for package users:
 * This function is an experimental API, it can change unexpectedly. Usage is at your own risk.
 */
declare const makePublicRollbarDebugger: (options: Readonly<RollbarOptions>) => PublicDebugOutput;

declare type Region = 
/** N. Virginia, USA */
'us'
/** Frankfurt, Germany */
 | 'eu';
declare type IPResolution = 
/** Resolution on a city level */
'city'
/**
 * Resolution on a city level + ISP info using a live query to MaxMind service.
 * Will take longer to complete, because requires a separate network request.
 */
 | 'full';
interface CommonLoadOptions extends Pick<LoadOptions, 'delayFallback'> {
    /**
     * Pro client key
     */
    token: string;
    /**
     * Region of the FingerprintJS service server
     * @default 'us'
     */
    region?: Region;
    /**
     * Your custom API endpoint for getting visitor data.
     * @example
     * 'https://fp.example.com'
     */
    endpoint?: string;
    /**
     * Your custom TLS endpoint.
     * @example
     * 'https://tls.fp.example.com'
     */
    tlsEndpoint?: string;
    /**
     * Disables the extra TLS request
     */
    disableTls?: boolean;
    /**
     * Override storages name (cookies, localStorage, etc).
     * Should only be used when the default name conflicts with some of your existing names.
     * @default '_vid'
     */
    storageKey?: string;
}
/**
 * Options for FingerprintJS agent loading
 */
interface PublicLoadOptions extends CommonLoadOptions {
    /**
     * If you need to debug the agent, set a debug output channel here.
     *
     * Warning! This is an experimental API, it's out of Semantic Versioning, i.e. may have incompatible changes within
     * a major version.
     */
    debug?: PublicDebugOutput;
}
/**
 * Options of getting a visitor identifier
 */
interface GetOptions<TExtended extends boolean, TIP extends IPResolution> {
    /**
     * Controls client-side timeout. Client timeout controls total time (both client-side and server-side) that any
     * identification event is allowed to run. It doesn't include time when the page is in background (not visible).
     * The value is in milliseconds.
     * @default 10000
     */
    timeout?: number;
    /**
     * `Tag` is a user-provided value or object that will be returned back to you in a webhook message.
     * You may want to use the `tag` value to be able to associate a server-side webhook event with a web request of the
     * current visitor.
     *
     * What values can be used as a `tag`?
     * Anything that identifies a visitor or a request.
     * You can pass the requestId as a `tag` and then get this requestId back in the webhook, associated with a visitorId.
     */
    tag?: unknown;
    /**
     * `linkedId` is a way of linking current identification event with a custom identifier.
     * This can be helpful to be able to filter API visit information later.
     */
    linkedId?: string;
    /**
     * Prevents agent from waiting for the TLS request to complete.
     *
     * @deprecated Use the `disableTls` option of `load()` instead
     */
    disableTls?: boolean;
    /**
     * Adds details about the visitor to the result
     */
    extendedResult?: TExtended;
    /**
     * IP resolution mode.
     * @default 'city'
     * @see https://dev.fingerprintjs.com/docs/geolocation
     */
    ipResolution?: TIP;
    /**
     * (does nothing)
     *
     * @deprecated Use the `debug` option of `load()` instead
     */
    debug?: boolean;
}

/**
 * Derives the get result type based on input options
 */
declare type DeriveGetResult<TExtended extends boolean, TIP extends IPResolution> = (false extends TExtended ? GetResult : never) | (true extends TExtended ? {
    city: ExtendedGetResult;
    full: FullIpExtendedGetResult;
}[TIP] : never);
/**
 * Agent object that can get visitor identifier
 */
interface Agent {
    /**
     * Gets the visitor identifier.
     * See the `ERROR_...` constants for expected error messages.
     * When an error is emitted by the backend, it gets a `requestId` field, same as in successful result.
     */
    get<TExtended extends boolean = false, TIP extends IPResolution = 'city'>(options?: Readonly<GetOptions<TExtended, TIP>>): Promise<DeriveGetResult<TExtended, TIP>>;
}
/**
 * Builds an instance of Agent and waits a delay required for a proper operation.
 */
declare const publicLoad: (options: Readonly<PublicLoadOptions>) => Promise<Agent>;

declare const ERROR_CLIENT_TIMEOUT = "Client timeout";
declare const ERROR_NETWORK_CONNECTION = "Network connection error";
declare const ERROR_NETWORK_ABORT = "Network request aborted";
declare const ERROR_BAD_RESPONSE_FORMAT = "Response cannot be parsed";

declare const ERROR_TOKEN_MISSING = V1NotAvailableVisitorIdReason.TokenMissing;
declare const ERROR_TOKEN_INVALID = V1NotAvailableVisitorIdReason.TokenNotFound;
declare const ERROR_TOKEN_EXPIRED = V1NotAvailableVisitorIdReason.TokenExpired;
declare const ERROR_BAD_REQUEST_FORMAT = V1NotAvailableVisitorIdReason.BadRequestFormat;
declare const ERROR_GENERAL_SERVER_FAILURE = V1NotAvailableVisitorIdReason.GeneralServerFailure;
declare const ERROR_SERVER_TIMEOUT = V1NotAvailableVisitorIdReason.ServerTimeout;
declare const ERROR_RATE_LIMIT = V1NotAvailableVisitorIdReason.RateLimit;
declare const ERROR_FORBIDDEN_ORIGIN = V1NotAvailableVisitorIdReason.ForbiddenOrigin;
declare const ERROR_FORBIDDEN_HEADER = V1NotAvailableVisitorIdReason.ForbiddenHeader;
declare const _default: {
    readonly load: (options: Readonly<PublicLoadOptions>) => Promise<Agent>;
    readonly ERROR_CLIENT_TIMEOUT: "Client timeout";
    readonly ERROR_NETWORK_CONNECTION: "Network connection error";
    readonly ERROR_NETWORK_ABORT: "Network request aborted";
    readonly ERROR_WRONG_REGION: string;
    readonly ERROR_SUBSCRIPTION_NOT_ACTIVE: string;
    readonly ERROR_TOKEN_MISSING: V1NotAvailableVisitorIdReason.TokenMissing;
    readonly ERROR_TOKEN_INVALID: V1NotAvailableVisitorIdReason.TokenNotFound;
    readonly ERROR_TOKEN_EXPIRED: V1NotAvailableVisitorIdReason.TokenExpired;
    readonly ERROR_BAD_REQUEST_FORMAT: V1NotAvailableVisitorIdReason.BadRequestFormat;
    readonly ERROR_BAD_RESPONSE_FORMAT: "Response cannot be parsed";
    readonly ERROR_GENERAL_SERVER_FAILURE: V1NotAvailableVisitorIdReason.GeneralServerFailure;
    readonly ERROR_SERVER_TIMEOUT: V1NotAvailableVisitorIdReason.ServerTimeout;
    readonly ERROR_RATE_LIMIT: V1NotAvailableVisitorIdReason.RateLimit;
    readonly ERROR_FORBIDDEN_ORIGIN: V1NotAvailableVisitorIdReason.ForbiddenOrigin;
    readonly ERROR_FORBIDDEN_HEADER: V1NotAvailableVisitorIdReason.ForbiddenHeader;
};

export default _default;
export { Agent, Confidence, ERROR_BAD_REQUEST_FORMAT, ERROR_BAD_RESPONSE_FORMAT, ERROR_CLIENT_TIMEOUT, ERROR_FORBIDDEN_HEADER, ERROR_FORBIDDEN_ORIGIN, ERROR_GENERAL_SERVER_FAILURE, ERROR_NETWORK_ABORT, ERROR_NETWORK_CONNECTION, ERROR_RATE_LIMIT, ERROR_SERVER_TIMEOUT, ERROR_SUBSCRIPTION_NOT_ACTIVE, ERROR_TOKEN_EXPIRED, ERROR_TOKEN_INVALID, ERROR_TOKEN_MISSING, ERROR_WRONG_REGION, ExtendedGetResult, FullIpExtendedGetResult, FullIpLocation, GetOptions, GetResult, IPResolution, IpLocation, PublicLoadOptions as LoadOptions, Region, publicLoad as load, makePublicConsoleDebugger as makeConsoleDebugger, makePublicDebugReportBuilder as makeDebugReportBuilder, makeMulticastDebugger, makePublicRollbarDebugger as makeRemoteDebugger };

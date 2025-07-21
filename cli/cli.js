#!/usr/bin/env node

import { Command, Option } from "commander";
import figlet from "figlet";
import defaults from "./defaults.js";
import { list } from "./list.js";
import { encode } from "./encode.js";
import { loadJson } from "./utils.js";

const p = loadJson(import.meta.url, "./package.json");

const program = new Command();

program
    .name("Protego CLI")
    .description(figlet.textSync("Protego", { horizontalLayout: "full" }))
    .version(p.version)
    .addOption(
        new Option("-r, --rpc-url <rpc-url>", "Ethereum Node RPC URL")
            .env("ETH_RPC_URL")
            .default(defaults.RPC_URL),
    )
    .addOption(
        new Option(
            "-b, --from-block <block-number>",
            "Display spells from a given block",
        )
            .argParser(Number.parseInt)
            .default(defaults.FROM_BLOCK),
    )
    .addOption(
        new Option(
            "--pause-address <address>",
            "MCD_PAUSE contract address",
        ).default(defaults.MCD_PAUSE_ADDRESS),
    )
    .showHelpAfterError()
    .addCommand(
        new Command("list")
            .description("List spells by status")
            .addOption(
                new Option("-s, --status <status>", "Filter by status")
                    .choices(["PENDING", "DROPPED", "EXECUTED", "ALL"])
                    .default(defaults.STATUS),
            )
            .addOption(
                new Option("-f, --format <format>", "Output format")
                    .choices(["TABLE", "JSON"])
                    .default(defaults.FORMAT),
            )
            .action(list),
    )
    .addCommand(
        new Command("encode")
            .description(
                "Encode calldata to drop spells (i.e: input for Etherscan/Tenderly  UIs)",
            )
            .action(encode),
    );

program.parse();

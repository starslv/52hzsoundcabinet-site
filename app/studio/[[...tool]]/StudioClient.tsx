"use client";

import React from "react";
import config from "../../../sanity.config";
import { Studio } from "sanity";

export default function StudioClient() {
  return <Studio config={config} />;
}
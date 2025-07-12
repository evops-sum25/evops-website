# EvOps / Client Extension

### UniFFI (Kotlin)

```shell
cargo run --package=evops-uniffi --release -- generate --language=kotlin --out-dir=target/ --library target/release/libevops.so
```

`target/uniffi/`

### Extism

```shell
cargo build --package=evops-extism --release --target=wasm32-unknown-unknown
```

`target/wasm32-unknown-unknown/release/evops.wasm`

fn main() -> std::io::Result<()> {
    println!("cargo:rerun-if-changed=../../proto/");
    prost_build::compile_protos(&["../../proto/evops/ext/v1/ext.proto"], &["../../proto/"])?;
    Ok(())
}

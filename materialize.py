import bpy
import os

def set_material(obj):
    new_material = bpy.data.materials.new(name="material")
    obj.data.materials.clear()
    obj.data.materials.append(new_material)
    new_material.use_nodes = False
    new_material.diffuse_color = (1.0, 1.0, 1.0, 1.0)
    new_material.roughness = 0.5
    new_material.specular_intensity = 0.5

def import_glb(file_path):
    bpy.ops.import_scene.gltf(filepath=file_path)

def export_selected_objects(output_file_path):
    bpy.ops.export_scene.gltf(filepath=output_file_path, export_format='GLB', use_selection=True)

def process_glb(input_file_path, output_file_path):
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.delete()

    import_glb(input_file_path)

    for obj in bpy.context.scene.objects:
        if obj.type == 'MESH' and obj.data:
            set_material(obj)

    bpy.ops.object.select_by_type(type='MESH')
    export_selected_objects(output_file_path)

    print(f"Success: Model exported to {output_file_path}")

    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.delete()

def main():
    input_folder = "/Users/hantoro/Downloads/input/"
    output_folder = "/Users/hantoro/Downloads/output/"
    os.makedirs(output_folder, exist_ok=True)

    for filename in os.listdir(input_folder):
        if filename.endswith(".glb"):
            input_file_path = os.path.join(input_folder, filename)
            output_file_path = os.path.join(output_folder, filename)
            process_glb(input_file_path, output_file_path)

if __name__ == "__main__":
    main()


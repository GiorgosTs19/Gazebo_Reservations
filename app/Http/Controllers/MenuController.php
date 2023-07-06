<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $input = $request->only('Menu_Name','Menu_Items',
            'Menu_Type','Menu_Category');
        $Name = $input['Menu_Name'];
        $Type = $input['Menu_Type'];
        if($Type === 'Bed')
            $Category = 'Bed_Package';
        else
            $Category = $input['Menu_Category'];
        $Items = $input['Menu_Items'];
        $Menu = new Menu;
        $Menu->Name = $Name;
        $Menu->Type = $Type;
        $Menu->Category = $Category;
        $Menu->save();
        if(is_array($Items))
            foreach($Items as $item){
                $Menu_Item = new MenuItem;
                $Menu_Item->Name = $item['Name'];
                $Menu_Item->Menu_ID = $Menu->id;
                $Menu_Item->is_gluten_free = $item['is_gluten_free'];
                $Menu_Item->is_lactose_free = $item['is_lactose_free'];
                $Menu_Item->is_wheat_free = $item['is_wheat_free'];
                $Menu_Item->is_vegan = $item['is_vegan'];
                $Menu_Item->is_vegetarian = $item['is_vegetarian'];
                $Menu_Item->save();
            }
        return redirect()->back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only('Menu_ID','Menu_Name','Menu_Items',
            'Menu_Type','Menu_Category');
        $Menu = Menu::find($input['Menu_ID']);
        if($Menu) {
            $inputItems = $input['Menu_Items'];
            $existingItems = $Menu->Items()->toArray();

            // Step 1: Comparing and identifying deleted items
            $itemsToBeDeleted = array_udiff($existingItems, $inputItems, function($existingItem, $inputItem) {
                if (!isset($inputItem['id'])) {
                    return 0; // Treat items without 'id' key as equal
                }
                return ($existingItem['id'] <=> $inputItem['id']);
            });
            $idsToBeDeleted = array_column($itemsToBeDeleted, 'id');

            $existingItems = array_filter($existingItems, function($item) use ($idsToBeDeleted) {
                return !in_array($item['id'], $idsToBeDeleted);
            });

            MenuItem::destroy($idsToBeDeleted);

            // Step 2: Identifying new items to be added
            $newItems = array_filter($inputItems, function($item) {
                return !isset($item['id']);
            });

            $menuId = $input['Menu_ID'];

            // Add the menu_id key to all the entries of the newItems array, so the
            // new items can be mass-created
            foreach ($newItems as $newItem) {
                $newMenuItem = MenuItem::create([
                    'Name' => $newItem['Name'],
                    'menu_id' => $menuId,
                    'is_gluten_free' => $newItem['is_gluten_free'],
                    'is_lactose_free' => $newItem['is_lactose_free'],
                    'is_wheat_free' => $newItem['is_wheat_free'],
                    'is_vegan' => $newItem['is_vegan'],
                    'is_vegetarian' => $newItem['is_vegetarian'],

                ]);
            }
            // Remove the new items from the $inputItems array
            $inputItems = array_filter($inputItems, function($item) {
                return isset($item['id']);
            });

            // Step 3: Comparing and updating existing items
            foreach ($inputItems as $inputItem) {
                foreach ($existingItems as $existingItem) {
                    if ($existingItem['id'] === $inputItem['id']) {
                        $itemToBeEdited = MenuItem::find($existingItem['id']);
                        if ($existingItem['Name'] !== $inputItem['Name']) {
                            $itemToBeEdited->Name = $inputItem['Name'];
                        }
                        if($existingItem['is_gluten_free'] !== $inputItem['is_gluten_free']){
                            $itemToBeEdited->is_gluten_free = $inputItem['is_gluten_free'];
                        }
                        if($existingItem['is_lactose_free'] !== $inputItem['is_lactose_free']){
                            $itemToBeEdited->is_lactose_free = $inputItem['is_lactose_free'];
                        }
                        if($existingItem['is_wheat_free'] !== $inputItem['is_wheat_free']){
                            $itemToBeEdited->is_wheat_free = $inputItem['is_wheat_free'];
                        }
                        if($existingItem['is_vegan'] !== $inputItem['is_vegan']){
                            $itemToBeEdited->is_vegan = $inputItem['is_vegan'];
                        }
                        if($existingItem['is_vegetarian'] !== $inputItem['is_vegetarian']){
                            $itemToBeEdited->is_vegetarian = $inputItem['is_vegetarian'];
                        }
                        $itemToBeEdited->save();
                        break;
                    }
                }
            }

            // At this point, $deletedItems contains the items to be removed from the database,
            // $newItems contains the new items to be added, and $databaseItems has been updated
            // with any changes in the frontendItems.
            return redirect()->back();
        }
        return redirect()->back()->withErrors(['MenuError'=>'Menu Not Found']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request) {
        $id = $request->header('X-Menu_ID');
        $Menu = Menu::find($id);
        if($Menu)
            $Menu->delete();
        return redirect()->back();
    }

    protected function compareItems($a,$b) {

    }
}

function isAssociativeArray($array) {
    return array_keys($array) !== range(0, count($array) - 1);
}
